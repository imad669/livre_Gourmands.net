import React from 'react';

export default function Contact() {
  return (
    <main style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:600, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
      <h1 style={{color:'#ffb347', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem'}}>Contactez-nous</h1>
      <p style={{fontSize:'1.1rem', marginBottom:'1.5rem'}}>Une question, un problème ou une suggestion ? Remplissez le formulaire ci-dessous, notre équipe vous répondra rapidement.</p>
      <form style={{maxWidth: 500, margin:'0 auto'}}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input type="text" className="form-control" id="nom" placeholder="Votre nom" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Votre email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows={4} placeholder="Votre message" required />
        </div>
        <button type="submit" className="btn btn-warning" style={{fontWeight:'bold', fontSize:'1.08rem'}}>Envoyer</button>
      </form>
      <div style={{marginTop:'2.5rem', color:'#888', fontSize:'1.05rem'}}>
        <strong>Email :</strong> contact@livresgourmands.net<br/>
        <strong>Téléphone :</strong> 01 23 45 67 89<br/>
        <strong>Adresse :</strong> 12 rue des Gourmands, 75000 Paris
      </div>
    </main>
  );
}
