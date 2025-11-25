import React from 'react';

const faqs = [
  {
    q: "Comment passer une commande ?",
    a: "Ajoutez les livres souhaités à votre panier, puis cliquez sur 'Commander' et suivez les instructions."
  },
  {
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal et Stripe."
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "La livraison standard prend 3 à 5 jours ouvrés. La livraison express est disponible en 24h."
  },
  {
    q: "Comment suivre ma commande ?",
    a: "Après validation, vous recevrez un email avec un lien de suivi. Vous pouvez aussi consulter votre espace client."
  },
  {
    q: "Puis-je retourner un livre ?",
    a: "Oui, vous disposez de 14 jours pour retourner un livre non utilisé. Contactez-nous pour la procédure."
  }
];

export default function FAQ() {
  return (
    <main style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:700, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
      <h1 style={{color:'#ffb347', fontWeight:800, fontSize:'2.2rem', marginBottom:'1.2rem'}}>Foire aux questions (FAQ)</h1>
      <div style={{marginTop:'2rem'}}>
        {faqs.map((f, i) => (
          <div key={i} style={{marginBottom:'1.5rem'}}>
            <strong style={{fontSize:'1.13em', color:'#222'}}>{f.q}</strong>
            <p style={{margin:'0.5rem 0 0 0', color:'#444'}}>{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
