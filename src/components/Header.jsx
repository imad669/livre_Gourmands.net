import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header(){
  const { cart } = useCart()
  const count = cart.reduce((s,i)=>s+i.qty,0)
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('user_email') || '')

  useEffect(() => {
    const handleAuthChange = (event) => {
      if (event?.detail?.email !== undefined) {
        setUserEmail(event.detail.email)
        return
      }
      setUserEmail(localStorage.getItem('user_email') || '')
    }

    const handleStorage = (event) => {
      if (event.key === 'user_email') {
        setUserEmail(event.newValue || '')
      }
    }

    window.addEventListener('auth-change', handleAuthChange)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener('auth-change', handleAuthChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const isLoggedIn = Boolean(userEmail)
  const userInitial = isLoggedIn ? (userEmail[0] || '').toUpperCase() : ''
  return (
    <header id="headerElement" style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', padding:'1.2rem 2.5vw 0.5rem 2vw', position:'relative', zIndex:10}}>
      <div className="logo" style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:0}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <i className="fa-solid fa-bag-shopping" style={{fontSize:'2rem', color:'#b3c0d1'}}></i>
          <span style={{fontWeight: 'bold', fontSize:'1.5rem', color:'#e3e6ed', fontFamily: 'var(--logoFont, Segoe UI)'}}>GastroLivres</span>
        </div>
        <p style={{letterSpacing: '0.5px', fontSize:'0.95rem', color:'#b3c0d1', marginLeft:2, marginTop:2}}>Shopping</p>
      </div>
      <div className="links" style={{display:'flex', alignItems:'center', gap:32}}>
        <Link style={{position: 'relative', display:'flex', alignItems:'center', gap:4, color:'var(--primary-accent)', fontWeight:600, fontSize:'1.08rem'}} className="cart" to="/cart">
          <i className="fa-solid fa-cart-shopping" style={{color:'var(--primary-accent)'}}></i>
          <span style={{marginLeft:8, color:'#eee'}}>$0.00</span>
          <span className="products-number" style={{marginLeft:2, color:'#eee'}}>{count}</span>
        </Link>
        {isLoggedIn ? (
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
              <span style={{color:'#eee', fontWeight:600, fontSize:'0.95rem'}}>{userEmail}</span>
              <span style={{color:'#b3c0d1', fontSize:'0.85rem'}}>Bienvenue</span>
            </div>
            <div aria-label="Profil utilisateur" title={userEmail} style={{width:42, height:42, borderRadius:'50%', background:'var(--primary-accent)', color:'#111927', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'1.1rem', boxShadow:'0 2px 10px #0004'}}>
              {userInitial}
            </div>
          </div>
        ) : (
          <>
            <Link className="sign-in" to="/signin" style={{marginLeft:12, color:'var(--primary-accent)', fontWeight:600, fontSize:'1.08rem'}}>
              <i className="fa-solid fa-right-to-bracket" style={{color:'var(--primary-accent)'}}></i>
              <span style={{marginLeft:6, color:'#eee'}}>Sign in</span>
            </Link>
            <Link className="register" to="/register" style={{marginLeft:12, color:'var(--primary-accent)', fontWeight:600, fontSize:'1.08rem'}}>
              <i className="fa-solid fa-user-plus" style={{color:'var(--primary-accent)'}}></i>
              <span style={{marginLeft:6, color:'#eee'}}>Register</span>
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
