import React from 'react';

export default function Conditions() {
  return (
    <main style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:700, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
      <h1 style={{color:'#ffb347', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem'}}>Conditions générales d'utilisation</h1>
      <p style={{fontSize:'1.1rem', marginBottom:'1.5rem'}}>Bienvenue sur livresgourmands.net. En utilisant ce site, vous acceptez les conditions suivantes :</p>
      <ul style={{color:'#444', fontSize:'1.08rem', marginBottom:'2rem'}}>
        <li>Les contenus sont protégés par le droit d’auteur.</li>
        <li>Les informations personnelles sont traitées conformément à notre politique de confidentialité.</li>
        <li>Le site ne peut être utilisé à des fins illégales ou frauduleuses.</li>
        <li>Les commandes sont soumises à disponibilité des stocks.</li>
        <li>Les prix peuvent être modifiés sans préavis.</li>
      </ul>
      <p style={{color:'#888', fontSize:'1.02rem'}}>Pour toute question, contactez-nous via la page <a href="/contact" style={{color:'#ffb347'}}>Contact</a>.</p>
    </main>
  );
}
