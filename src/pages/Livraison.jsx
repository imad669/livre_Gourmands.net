import React from 'react';

export default function Livraison() {
  return (
    <main style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:600, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
      <h1 style={{color:'#222', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem'}}>Livraison</h1>
      <p style={{fontSize:'1.1rem', marginBottom:'1rem'}}>Choisissez votre mode de livraison :</p>
      <ul style={{marginBottom:'2rem', fontSize:'1.08rem'}}>
        <li>Livraison standard <b>(3-5 jours ouvrés)</b> - <b>4,99 $CA</b></li>
        <li>Livraison express <b>(24h)</b> - <b>9,99 $CA</b></li>
        <li>Retrait en magasin - <b>Gratuit</b></li>
      </ul>
      <p style={{marginTop: '2rem', fontWeight:600}}>Entrez votre adresse de livraison :</p>
      <form style={{maxWidth: 400}}>
        <div className="mb-3">
          <label htmlFor="adresse" className="form-label" style={{color:'#222'}}>Adresse</label>
          <input type="text" className="form-control" id="adresse" placeholder="123 rue Exemple" />
        </div>
        <div className="mb-3">
          <label htmlFor="ville" className="form-label" style={{color:'#222'}}>Ville</label>
          <input type="text" className="form-control" id="ville" placeholder="Paris" />
        </div>
        <div className="mb-3">
          <label htmlFor="cp" className="form-label" style={{color:'#222'}}>Code postal</label>
          <input type="text" className="form-control" id="cp" placeholder="75000" />
        </div>
        <button type="submit" className="btn btn-primary">Valider la livraison</button>
      </form>
    </main>
  );
}
