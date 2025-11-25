
import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import { useToast } from '../context/ToastContext'


export default function Home(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { show } = useToast()

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    api.get('/ouvrages')
      .then(res => { if(mounted) setItems(res.data) })
      .catch(err => {
        if(mounted){
          const msg = err.customMessage || err.message || 'Erreur'
          setError(msg)
          show && show(`Impossible de récupérer les ouvrages — ${msg}`, { variant: 'danger' })
        }
      })
      .finally(()=>{ if(mounted) setLoading(false) })
    return ()=> mounted = false
  },[])

  return (
    <div className="container-custom" style={{marginTop: '2rem'}}>
      {loading && <p>Chargement...</p>}
      {error && !loading && <div className="alert alert-danger">{error}</div>}
      {/* Section Nouveautés */}
      <h2 style={{color:'#ffb347', fontWeight:800, marginTop:'2.5rem', marginBottom:'1.2rem'}}>Nouveautés</h2>
      <section className="products d-flex flex-wrap mb-5">
        {items
          .filter(it => it.nouveau)
          .map(i => (
            <ProductCard key={i.id} item={i} />
          ))}
      </section>


      {/* Section Meilleures ventes uniquement */}
      <h2 style={{color:'#ff7f50', fontWeight:800, marginTop:'2.5rem', marginBottom:'1.2rem'}}>Meilleures ventes</h2>
      <section className="products d-flex flex-wrap mb-5">
        {(() => {
          const bests = items.filter(it => it.best)
          if (bests.length === 0) {
            return <>
              <ProductCard item={{
                id: 101,
                titre: 'Gâteaux du monde',
                auteur: 'Fatima Benali',
                description: 'Un tour du monde des meilleurs gâteaux traditionnels et modernes.',
                prix: 22.00,
                stock: 8,
                image: '/images/gateaux-du-monde.jpg',
                categorie: 'Pâtisserie'
              }} />
              <ProductCard item={{
                id: 102,
                titre: 'Chocolat & Gourmandises',
                auteur: 'Jean-Pierre Cacao',
                description: 'Recettes créatives autour du chocolat pour petits et grands gourmands.',
                prix: 18.50,
                stock: 15,
                image: '/images/chocolat-gourmandises.jpg',
                categorie: 'Chocolat'
              }} />
            </>;
          }
          return bests.slice(0,2).map(i => <ProductCard key={i.id} item={i} />);
        })()}
      </section>

      {/* Bouton vers tous les livres */}
      <div style={{display:'flex',justifyContent:'center',marginTop:'2.5rem'}}>
        <a href="/tous-les-livres" className="gourmand-btn" style={{fontSize:'1.18rem',padding:'0.85rem 2.5rem',textDecoration:'none'}}>Voir tous les livres</a>
      </div>
    </div>
  )
}
