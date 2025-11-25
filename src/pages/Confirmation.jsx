import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function Confirmation() {
  const { clear } = useCart();
  useEffect(() => { clear(); }, [clear]);
  return (
    <div className="container mt-4" style={{maxWidth:600, textAlign:'center'}}>
      <h1 style={{color:'#28a745', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem'}}>Paiement réussi !</h1>
      <p style={{fontSize:'1.15rem', marginBottom:'2rem'}}>Merci pour votre commande.<br/>Votre paiement a été traité avec succès.</p>
      <img src="/images/confirmation.png" alt="Confirmation" style={{height:120, marginBottom:'1.5rem'}} />
      <a href="/" className="btn btn-primary" style={{fontWeight:700, fontSize:'1.08rem'}}>Retour à l'accueil</a>
    </div>
  );
}