import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import TousLesLivres from './pages/TousLesLivres'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import PaymentSimulation from './pages/PaymentSimulation'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Livraison from './pages/Livraison'
import Avis from './pages/Avis'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Conditions from './pages/Conditions'
import Mentions from './pages/Mentions'

import Header from './components/Header'
import WelcomeSection from './components/WelcomeSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
            <div style={{position:'relative', width:'100vw', height:'100vh', overflow:'hidden'}}>
              <video className="welcome-bg" src="/images/welcome.mp4" autoPlay loop muted playsInline style={{position:'absolute',top:0,left:0,width:'100vw',height:'100vh',objectFit:'cover',zIndex:1,filter:'brightness(0.7)'}} />
              <div style={{position:'relative',zIndex:2}}>
                <Header />
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'60vh',marginTop:'4vh'}}>
                  <h1 style={{fontSize:'3.2rem',fontWeight:'bold',color:'#fff',textShadow:'0 2px 18px #000a',letterSpacing:'1.5px',marginBottom:'1.5rem',fontFamily:'var(--logoFont, Segoe UI)'}}>GastroLivres</h1>
                  <p style={{fontSize:'1.35rem',color:'#fff',textShadow:'0 1px 12px #000a',lineHeight:1.7,maxWidth:700,textAlign:'center'}}>Découvrez, commandez et partagez la passion des livres culinaires !<br/>Faites défiler pour explorer notre sélection.</p>
                </div>
              </div>
            </div>
            <div className="container mt-4">
              <Home/>
            </div>
            <Footer />
          </>
        } />
        <Route path="/product/:id" element={<div className="container mt-4"><Product/></div>} />
        <Route path="/cart" element={<div className="container mt-4"><Cart/></div>} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/paiement" element={<PaymentSimulation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Pages supplémentaires pour les liens du footer */}
        <Route path="/decouvrir" element={<div className="container mt-4"><h2 style={{color:'#fff'}}>Découvrir les livres</h2><p style={{color:'#eee'}}>Page à compléter…</p></div>} />
        <Route path="/commander" element={
          <div style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:700, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
            <h1 style={{color:'#222', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem'}}>Commander</h1>
            <p style={{fontSize:'1.1rem', marginBottom:'1.5rem'}}>Merci de vérifier votre panier et vos informations de livraison avant de valider la commande.</p>
            <ul style={{fontSize:'1.08rem', marginBottom:'2rem'}}>
              <li>Étape 1 : Vérifiez le contenu de votre <a href="/cart">panier</a>.</li>
              <li>Étape 2 : Saisissez vos informations de <a href="/livraison">livraison</a>.</li>
              <li>Étape 3 : Procédez au paiement sécurisé.</li>
            </ul>
            <button className="gourmand-btn">Valider la commande</button>
          </div>
        } />
        <Route path="/tous-les-livres" element={<TousLesLivres />} />
        <Route path="/avis" element={<div className="container mt-4"><Avis/></div>} />
        <Route path="/livraison" element={<div className="container mt-4"><Livraison/></div>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/mentions" element={<Mentions />} />
      </Routes>
    </div>
  )
}
