import React from 'react';

export default function Mentions() {
  return (
    <main style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:700, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
      <h1 style={{color:'#ffb347', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem'}}>Mentions légales</h1>
      <ul style={{color:'#444', fontSize:'1.08rem', marginBottom:'2rem'}}>
        <li><strong>Éditeur :</strong> Livres Gourmands, 1234 rue Sainte-Catherine Ouest, Montréal, QC H3B 1E2, Canada</li>
        <li><strong>Directeur de publication :</strong> Imad Abahmane</li>
        <li><strong>Hébergement :</strong> Hébergement Canada, 1000 rue de la Gauchetière Ouest, Montréal, QC H3B 4W5</li>
        <li><strong>Email :</strong> contact@livresgourmands.net</li>
        <li><strong>Numéro d'entreprise (NEQ) :</strong> 1234567890</li>
      </ul>
      <p style={{color:'#888', fontSize:'1.02rem'}}>Ce site est protégé par les lois canadiennes sur la propriété intellectuelle et la vie privée.</p>
    </main>
  );
}
