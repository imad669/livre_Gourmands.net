import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function PaymentSimulation() {
  const navigate = useNavigate();
  const { cart, clear } = useCart();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const currentYear = new Date().getFullYear() % 100;
  const years = Array.from({length: 12}, (_, i) => String(currentYear + i).padStart(2, '0'));
  const [cvc, setCvc] = useState('');

  const total = cart.reduce((s,i)=> s + (i.prix || 0) * i.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !number || !expMonth || !expYear || !cvc){
      alert('Veuillez remplir toutes les informations de carte.');
      return;
    }
    alert('Paiement effectué avec succès !');
    clear();
    navigate('/');
  };

  return (
    <div className="container mt-4" style={{maxWidth: 720}}>
      <h1 style={{color:'#ffb347', fontWeight:800, fontSize:'2rem', marginBottom:'1rem'}}>Paiement sécurisé</h1>
      <div style={{display:'flex', gap:'1.5rem', flexWrap:'wrap'}}>
        <form onSubmit={handleSubmit} style={{flex:1, minWidth:260, background:'#1f1a1f', padding:'1.5rem', borderRadius:12, boxShadow:'0 2px 16px #0004'}}>
          <div className="mb-3">
            <label className="form-label" style={{color:'#fff'}}>Nom sur la carte</label>
            <input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Jean Dupont" />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{color:'#fff'}}>Numéro de carte</label>
            <input className="form-control" value={number} onChange={e=>setNumber(e.target.value)} placeholder="4242 4242 4242 4242" />
          </div>
          <div style={{display:'flex', gap:12}}>
            <div className="mb-3" style={{flex:1}}>
              <label className="form-label" style={{color:'#fff'}}>Expiration</label>
              <div style={{display:'flex', gap:8}}>
                <select
                  className="form-control"
                  value={expMonth}
                  onChange={e=>setExpMonth(e.target.value)}
                  style={{width:'70px'}}
                >
                  <option value="">MM</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i+1} value={String(i+1).padStart(2, '0')}>
                      {String(i+1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  className="form-control"
                  value={expYear}
                  onChange={e=>setExpYear(e.target.value)}
                  style={{width:'70px'}}
                >
                  <option value="">AA</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3" style={{flex:1}}>
              <label className="form-label" style={{color:'#fff'}}>CVC</label>
              <input className="form-control" value={cvc} onChange={e=>setCvc(e.target.value)} placeholder="123" />
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100" style={{marginTop:'0.5rem'}}>Payer maintenant</button>
        </form>

        <aside style={{width:260, background:'#241c24', padding:'1.2rem', borderRadius:12, color:'#fff'}}>
          <h4 style={{marginBottom:'0.8rem'}}>Récapitulatif</h4>
          <ul style={{listStyle:'none', padding:0, margin:0, maxHeight:180, overflowY:'auto', fontSize:'0.9rem'}}>
            {cart.map(i => (
              <li key={i.id} style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
                <span>{i.titre} x {i.qty}</span>
                <span>{(i.prix * i.qty).toFixed(2)} $CA</span>
              </li>
            ))}
          </ul>
          <hr />
          <div style={{display:'flex', justifyContent:'space-between', fontWeight:700}}>
            <span>Total</span>
            <span>{total.toFixed(2)} $CA</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
