import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CarteCredit() {
  const [form, setForm] = useState({ nom: '', numero: '', exp: '', cvc: '' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { checkout, cart } = useCart();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(cart.length === 0){
      alert('Votre panier est vide.');
      return;
    }
    setLoading(true);
    try {
      await checkout();
      setSuccess(true);
      setTimeout(() => navigate('/confirmation'), 800);
    } catch (err) {
      const apiMessage = err?.response?.data?.error || err.customMessage || err.message || 'Paiement refusé.';
      alert(apiMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:420, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
      <h1 style={{color:'#635bff', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem', display:'flex', alignItems:'center', gap:12}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Stripe_Logo%2C_revised_2016.png" alt="Stripe" style={{height:36, verticalAlign:'middle'}} />
        Paiement par carte
      </h1>
      {success ? (
        <div style={{color:'#28a745', fontWeight:600, fontSize:'1.2em', marginTop:'2rem'}}>Paiement accepté ! Merci pour votre achat.</div>
      ) : (
      <form onSubmit={handleSubmit} style={{maxWidth: 400, margin:'0 auto'}}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom sur la carte</label>
          <input type="text" className="form-control" id="nom" name="nom" value={form.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="numero" className="form-label">Numéro de carte</label>
          <input type="text" className="form-control" id="numero" name="numero" value={form.numero} onChange={handleChange} required maxLength={19} placeholder="1234 5678 9012 3456" />
        </div>
        <div className="mb-3" style={{display:'flex', gap:12}}>
          <div style={{flex:1}}>
            <label htmlFor="exp" className="form-label">Expiration</label>
            <input type="text" className="form-control" id="exp" name="exp" value={form.exp} onChange={handleChange} required maxLength={5} placeholder="MM/AA" />
          </div>
          <div style={{flex:1}}>
            <label htmlFor="cvc" className="form-label">CVC</label>
            <input type="text" className="form-control" id="cvc" name="cvc" value={form.cvc} onChange={handleChange} required maxLength={4} placeholder="123" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100" style={{fontWeight:'bold', fontSize:'1.08rem', borderRadius:8, marginTop:8}} disabled={loading}>
          {loading ? 'Traitement...' : 'Payer'}
        </button>
      </form>
      )}
    </main>
  );
}
