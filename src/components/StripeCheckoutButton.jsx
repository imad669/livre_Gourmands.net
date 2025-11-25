import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Publishable key via Vite env (define VITE_STRIPE_PUBLISHABLE_KEY in frontend .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

export default function StripeCheckoutButton({ email }) {
  const { cart, checkout } = useCart();
  const navigate = useNavigate();
  const [methodTypes, setMethodTypes] = useState(['card']);
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((s,i)=> s + (i.prix || 0) * i.qty, 0);

  const uiMethods = [
    { key: 'card', label: 'Carte bancaire', detail: 'Visa / Mastercard', stripe: 'card' },
    { key: 'wallet', label: 'Apple Pay / Google Pay', detail: 'via Stripe', stripe: 'card' },
    { key: 'paypal', label: 'PayPal', detail: 'Bientôt disponible', stripe: 'card', disabled: true }
  ];

  const handleClick = async () => {
    if(cart.length === 0){
      alert('Panier vide');
      return;
    }
    // Show confirmation dialog before payment
    const confirmed = window.confirm('Confirmez-vous le paiement ?');
    if (!confirmed) return;
    setLoading(true);
    try {
      await checkout();
      // Simulate payment success for demo: redirect to confirmation page
      navigate('/confirmation');
      // Uncomment below for real Stripe checkout
      /*
      const stripe = await stripePromise;
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(c => ({ id: c.id, titre: c.titre, prix: c.prix, qty: c.qty, image: c.image })),
          email: email || localStorage.getItem('user_email') || '',
          paymentMethods: methodTypes.length ? methodTypes : ['card']
        })
      });
      if(!response.ok){
        const text = await response.text().catch(() => '');
        alert('Le paiement a échoué. Veuillez réessayer plus tard.');
        console.error('Checkout HTTP error', response.status, text);
        return;
      }

      let session = null;
      try {
        session = await response.json();
      } catch (e) {
        alert('Réponse inattendue du serveur de paiement.');
        console.error('Failed to parse checkout JSON', e);
        return;
      }

      if(!session || !session.id){
        alert('Impossible de créer la session de paiement.');
        return;
      }
      if(session.error){
        alert(session.error);
        return;
      }
      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        alert(result.error.message);
      }
      */
    } catch (err) {
      const apiMessage = err?.response?.data?.error || err.customMessage || err.message || 'Une erreur est survenue.';
      alert(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginTop:12}}>
      <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:8}}>
        {uiMethods.map(pm => {
          const stripeKey = pm.stripe || pm.key;
          const active = methodTypes.includes(stripeKey) && !pm.disabled;
          return (
            <button
              key={pm.key}
              type="button"
              disabled={pm.disabled}
              onClick={() => {
                if (pm.disabled) return;
                setMethodTypes([stripeKey]);
                if (pm.key === 'card') {
                  // classic card flow: go to local card page
                  navigate('/paiement');
                } else if (pm.key === 'wallet') {
                  // wallet flow: show confirmation before payment
                  handleClick();
                }
              }}
              style={{
                padding:'6px 12px',
                borderRadius:6,
                border: active ? '2px solid #28a745' : '1px solid #444',
                background: active ? '#28a745' : '#222',
                color:'#fff',
                fontSize:'0.82rem',
                cursor: pm.disabled ? 'not-allowed' : 'pointer',
                opacity: pm.disabled ? 0.4 : 1,
                display:'flex',
                flexDirection:'column',
                alignItems:'flex-start'
              }}
            >
              <span>{pm.label}</span>
              <small style={{fontSize:'0.7rem', opacity:0.85}}>{pm.detail}</small>
            </button>
          );
        })}
      </div>
      <button disabled={loading} className="btn btn-success w-100" style={{minHeight:44, fontWeight:'bold', fontSize:'1.05rem', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', gap:10}} onClick={handleClick}>
        <img src="/images/stripe.png" alt="Stripe" style={{height:24, background:'#fff', borderRadius:4, padding:'2px 4px'}} />
        {loading ? 'Redirection...' : `Payer (${total.toFixed(2)} $CA)`}
      </button>
    </div>
  );
}
