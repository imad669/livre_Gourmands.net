require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { pool, init } = require('./db')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())

// Stripe payment API
const stripeRouter = require('../stripe');
app.use('/api', stripeRouter);

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' })
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email])
    if(rows.length) return res.status(400).json({ error: 'Email déjà utilisé' })
    const hash = await bcrypt.hash(password, 10)
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' })
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    if(!rows.length) return res.status(400).json({ error: 'Utilisateur inconnu' })
    const user = rows[0]
    const ok = await bcrypt.compare(password, user.password)
    if(!ok) return res.status(400).json({ error: 'Mot de passe incorrect' })
    // Générer un token JWT (optionnel, secret à mettre dans .env)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '2h' })
    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.get('/api/ouvrages', async (req, res) => {
  try{
    const [rows] = await pool.query('SELECT * FROM ouvrages')
    res.json(rows)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.get('/api/ouvrages/:id', async (req, res) => {
  try{
    const id = Number(req.params.id)
    const [rows] = await pool.query('SELECT * FROM ouvrages WHERE id = ?', [id])
    if(rows.length === 0) return res.status(404).json({ error: 'Introuvable' })
    res.json(rows[0])
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

app.post('/api/checkout', async (req, res) => {
  const { items } = req.body
  if(!Array.isArray(items) || items.length === 0){
    return res.status(400).json({ error: 'Panier vide.' })
  }

  let conn
  try {
    conn = await pool.getConnection()
    await conn.beginTransaction()

    const updated = []

    for (const rawItem of items) {
      const id = Number(rawItem?.id)
      const qty = Number(rawItem?.qty)
      if(!Number.isInteger(id) || !Number.isInteger(qty) || qty <= 0){
        await conn.rollback()
        return res.status(400).json({ error: 'Article invalide dans le panier.' })
      }

      const [rows] = await conn.query('SELECT stock, titre FROM ouvrages WHERE id = ? FOR UPDATE', [id])
      if(rows.length === 0){
        await conn.rollback()
        return res.status(404).json({ error: `Livre ${id} introuvable.` })
      }

      const { stock = 0, titre } = rows[0]
      const currentStock = Number(stock) || 0
      if(currentStock < qty){
        await conn.rollback()
        return res.status(409).json({ error: `Stock insuffisant pour "${titre}".` })
      }

      await conn.query('UPDATE ouvrages SET stock = stock - ? WHERE id = ?', [qty, id])
      updated.push({ id, remaining: currentStock - qty })
    }

    await conn.commit()
    res.json({ success: true, updated })
  } catch (err) {
    if(conn){
      try { await conn.rollback() } catch (_) {}
    }
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de la validation du paiement.' })
  } finally {
    if(conn){
      conn.release()
    }
  }
})

// Create new ouvrage
app.post('/api/ouvrages', async (req, res) => {
  const { id, titre, auteur, description, prix, stock, image, categorie } = req.body
  if(!id || !titre){
    return res.status(400).json({ error: 'id et titre requis' })
  }
  try {
    await pool.query(
      'INSERT INTO ouvrages (id, titre, auteur, description, prix, stock, image, categorie) VALUES (?,?,?,?,?,?,?,?)',
      [id, titre, auteur || null, description || null, prix || 0, stock || 0, image || null, categorie || null]
    )
    res.status(201).json({ success: true })
  } catch (err) {
    console.error(err)
    if(err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'ID déjà utilisé' })
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Update ouvrage
app.put('/api/ouvrages/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { titre, auteur, description, prix, stock, image, categorie } = req.body
  try {
    const [rows] = await pool.query('SELECT id FROM ouvrages WHERE id = ?', [id])
    if(!rows.length) return res.status(404).json({ error: 'Introuvable' })
    await pool.query(
      'UPDATE ouvrages SET titre=?, auteur=?, description=?, prix=?, stock=?, image=?, categorie=? WHERE id=?',
      [titre || null, auteur || null, description || null, prix || 0, stock || 0, image || null, categorie || null, id]
    )
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Bulk insert ouvrages (array of objects)
app.post('/api/ouvrages/bulk', async (req, res) => {
  const { items } = req.body
  if(!Array.isArray(items) || !items.length) return res.status(400).json({ error: 'items array requis' })
  try {
    const values = items.map(o => [o.id, o.titre, o.auteur || null, o.description || null, o.prix || 0, o.stock || 0, o.image || null, o.categorie || null])
    await pool.query('INSERT INTO ouvrages (id,titre,auteur,description,prix,stock,image,categorie) VALUES ?', [values])
    res.status(201).json({ success: true, count: values.length })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3001

init().then(()=>{
  app.listen(PORT, ()=>{
    console.log(`Backend listening on http://localhost:${PORT}`)
  })
}).catch(err=>{
  console.error('Failed to initialize DB', err)
  // Démarrer quand même pour Stripe
  app.listen(PORT, ()=>{
    console.log(`Backend (Stripe only) listening on http://localhost:${PORT}`)
  })
})
