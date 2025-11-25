import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function Product(){
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem } = useCart()
  const { show } = useToast()

  useEffect(()=>{
    setLoading(true)
    api.get(`/ouvrages/${id}`)
      .then(res => setItem(res.data))
      .catch(err => {
        const msg = err.customMessage || err.message || 'Erreur'
        setError(msg)
      })
      .finally(()=>setLoading(false))
  },[id])

  if(loading) return <p>Chargement...</p>
  if(error) return <div className="alert alert-danger">{error}</div>
  if(!item) return <p>Ouvrage introuvable</p>

  return (
    <main className="container-custom product-page" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start'}}>
      <div>
        <img src={item.image || 'https://via.placeholder.com/600x400'} style={{width: '100%', borderRadius:6}} alt={item.titre} />
      </div>

      <div className="product-details">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h2 style={{fontWeight:'bold',color:'#fff',textShadow:'0 2px 8px #000a'}}>{item.titre}</h2>
          <p className="price" style={{color:'#ffb347',fontWeight:700,fontSize:'1.2rem',textShadow:'0 2px 8px #000a'}}>{item.prix ? item.prix + ' $CA' : ''}</p>
        </div>
        <p style={{color:'#ffb347',fontWeight:600,marginBottom:8,textShadow:'0 2px 8px #000a'}}>{item.auteur}</p>
        <p style={{color:'#fff',fontSize:'1.13rem',marginBottom:12,textShadow:'0 2px 8px #000a'}}>{item.description}</p>
        <p style={{color:'#fff',fontSize:'1.1rem',marginBottom:12,textShadow:'0 2px 8px #000a'}}>Stock: {item.stock ?? '—'}</p>
        <button className="add-to-cart" onClick={() => { addItem(item,1); show && show('Produit ajouté au panier', { variant: 'success' }) }}>
          <i className="fa-solid fa-cart-plus"></i>
          Ajouter au panier
        </button>
      </div>
    </main>
  )
}
