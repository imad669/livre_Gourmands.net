import React from 'react'
import { useCart } from '../context/CartContext'
import StripeCheckoutButton from '../components/StripeCheckoutButton'

export default function Cart(){
  const { cart, removeItem, updateQty, clear } = useCart()
  const total = cart.reduce((s,i)=> s + (i.prix || 0) * i.qty, 0)

  if(cart.length === 0) return (
    <div>
      <h1 style={{color:'#ffb347', fontWeight:800, fontSize:'2.2rem', letterSpacing:'1px', textShadow:'0 2px 8px #000a'}}>Panier</h1>
      <p>Votre panier est vide.</p>
    </div>
  )

  return (
    <div className="container-custom">
      <h1>Panier</h1>

      <section className="cart">
        {cart.map(i => (
          <article className="product flex" key={i.id} style={{alignItems:'center', background:'var(--main-bg)', borderRadius:10, marginBottom:12, padding:'0.7rem 1.2rem', boxShadow:'0 2px 12px #0002'}}>
            <button className="btn btn-link" style={{color:'#ffb347', fontSize:'1.2rem', marginRight:8}} onClick={()=>removeItem(i.id)} title="Retirer">
              <i className="fa-solid fa-trash-can"></i>
            </button>

            <span className="price" style={{fontWeight:'bold', color:'#ffb347', fontSize:'1.13rem', marginRight:10}}>{i.prix} $CA</span>

            <div className="flex" style={{marginRight: '1rem', background:'#231b20', borderRadius:6, padding:'2px 6px'}}>
              <button className="decrease btn btn-sm" style={{background:'none', border:'none', color:'#ffb347', fontWeight:700, fontSize:'1.15rem', width:28, height:28}} onClick={()=>updateQty(i.id, Math.max(1, i.qty - 1))}>-</button>
              <div className="quantity flex" style={{padding:'0 0.6rem', alignItems:'center', color:'#fff', fontWeight:600}}>{i.qty}</div>
              <button className="increase btn btn-sm" style={{background:'none', border:'none', color:'#ffb347', fontWeight:700, fontSize:'1.15rem', width:28, height:28}} onClick={()=>updateQty(i.id, i.qty + 1)}>+</button>
            </div>

            <p className="title" style={{flex:1, color:'#fff', fontWeight:600, fontSize:'1.08rem', margin:0}}>{i.titre}</p>

            <img style={{borderRadius: '0.22rem', marginLeft:8, boxShadow:'0 2px 8px #0002'}} width="70" height="70" alt="" src={i.image || 'https://via.placeholder.com/70'} />
          </article>
        ))}
      </section>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: '1rem'}}>
        <div>
          <button className="clear btn btn-outline-danger" onClick={clear}>
            <i style={{color:'#fff', marginRight: 8}} className="fa-solid fa-trash-can icon"></i>
            Vider le panier
          </button>
        </div>

        <section className="summary text-end">
          <h4 style={{color:'#ffb347', fontWeight:700, fontSize:'1.25rem'}}>Résumé</h4>
          <div className="flex" style={{justifyContent:'space-between', color:'#fff', fontWeight:500}}>
            <p className="Subtotal" style={{margin:0}}>Sous-total</p>
            <p style={{margin:0}}>{total.toFixed(2)} $CA</p>
          </div>
            <StripeCheckoutButton amount={total} email={''} />
          <div style={{marginTop:8}}>
            <a href="/signin" style={{color:'#fff', fontWeight:700, fontSize:'1.13rem', textDecoration:'underline', textShadow:'0 2px 8px #000a'}}>Veuillez vous connecter pour continuer.</a>
          </div>
        </section>
      </div>
    </div>
  )
}
