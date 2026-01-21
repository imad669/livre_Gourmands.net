const mysql = require('mysql2/promise')
const fs = require('fs')
const path = require('path')


const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASS = '',
  DB_NAME = 'livresgourmands'
} = process.env

console.log('DEBUG DB ENV:', {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME
});

console.log('DEBUG DB ENV:', {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME
});

const useSsl = String(process.env.DB_SSL || '').toLowerCase() === 'true'

let sslOptions = undefined
if (useSsl) {
  const ca = process.env.DB_CA || process.env.DB_CERT || ''
  if (ca) {
    sslOptions = { ca }
  } else {
    sslOptions = { rejectUnauthorized: true }
  }
}

const pool = mysql.createPool(Object.assign({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}, useSsl ? { ssl: sslOptions } : {}))


async function init(){
  // Create ouvrages table if not exists
  const createOuvragesSql = `
    CREATE TABLE IF NOT EXISTS ouvrages (
      id INT PRIMARY KEY,
      titre VARCHAR(255),
      auteur VARCHAR(255),
      description TEXT,
      prix DECIMAL(10,2),
      stock INT,
      image TEXT,
      categorie VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  await pool.query(createOuvragesSql)

  // Create users table if not exists
  const createUsersSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  await pool.query(createUsersSql)

  // seed from frontend/mock/db.json if table empty
  const [rows] = await pool.query('SELECT COUNT(*) AS c FROM ouvrages')
  const count = rows[0].c
  if(count === 0){
    try{
      const mockPath = path.resolve(__dirname, '../../frontend/mock/db.json')
      const raw = fs.readFileSync(mockPath, 'utf8')
      const data = JSON.parse(raw)
      if(Array.isArray(data.ouvrages)){
        const insertSql = `INSERT INTO ouvrages (id,titre,auteur,description,prix,stock,image,categorie) VALUES ?`
        const values = data.ouvrages.map(o => [o.id, o.titre, o.auteur, o.description, o.prix || 0, o.stock || 0, o.image || null, o.categorie || null])
        if(values.length) await pool.query(insertSql, [values])
        console.log('Seeded ouvrages from frontend/mock/db.json')
      }
    }catch(err){
      console.warn('Failed to seed data:', err.message)
    }
  }
}

module.exports = { pool, init }
