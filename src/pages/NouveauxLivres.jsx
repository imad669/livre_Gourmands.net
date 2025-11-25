import React from 'react';

const nouveauxLivres = [
  {
    id: 5,
    titre: 'Gâteaux du monde',
    auteur: 'Fatima Benali',
    description: 'Un tour du monde des meilleurs gâteaux traditionnels et modernes.',
    prix: 22.00,
    stock: 8
  },
  {
    id: 6,
    titre: 'Chocolat & Gourmandises',
    auteur: 'Jean-Pierre Cacao',
    description: 'Recettes créatives autour du chocolat pour petits et grands gourmands.',
    prix: 18.50,
    stock: 15
  }
];

export default function NouveauxLivres() {
  return (
    <div className="container-custom" style={{marginTop:'2.5rem'}}>
      <h1 style={{color:'#ffb347', fontWeight:800, marginBottom:'2rem'}}>Nouveaux livres</h1>
      <div className="row">
        {nouveauxLivres.map(livre => (
          <div className="col-12 col-md-6 mb-4" key={livre.id}>
            <article className="card h-100 product-card" style={{ position: 'relative', overflow: 'hidden', background: 'var(--main-bg)', borderRadius: '18px', boxShadow: '0 2px 16px #0002', border: '1px solid #2a2026', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#444', borderRadius: '12px 12px 0 0', height: 240, minHeight: 240, width: '100%', padding: 0, overflow: 'hidden' }}>
                <span style={{color:'#fff', opacity:0.5, fontSize:'1.2rem'}}>Image à venir</span>
              </div>
              <div className="card-body d-flex flex-column" style={{ paddingRight: 18, paddingBottom: 32, flex: '1 1 auto' }}>
                <div style={{ flex: '1 1 auto' }}>
                  <h5 className="card-title" style={{ color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 6px #000' }}>{livre.titre}</h5>
                  <p style={{color:'#ffb347',fontWeight:600,marginBottom:8,textShadow:'0 2px 8px #000a'}}>{livre.auteur}</p>
                  <p className="card-text" style={{ color: '#fff', marginBottom: 12, textShadow: '2px 2px 8px #000', wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{livre.description}</p>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3" style={{ gap: 8 }}>
                  <div className="d-flex align-items-center" style={{ color: '#fff', fontWeight: 'bold', fontSize: 22, textShadow: '2px 2px 8px #000' }}>
                    <span style={{ fontSize: 22, marginRight: 4 }}>-</span>
                    <span style={{ fontSize: 20 }}>{livre.prix} $CA</span>
                    <span style={{ fontSize: 22, marginLeft: 4 }}>+</span>
                  </div>
                  <button className="btn btn-outline-warning" style={{ fontWeight: 600, width: '80px', textAlign: 'center' }} disabled>Voir</button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}