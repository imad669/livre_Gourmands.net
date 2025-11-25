
import React, { useState } from 'react';

function StarRating({ value, onChange }) {
  return (
    <div style={{fontSize:'1.7rem', color:'#ffb347', display:'flex', gap:2, cursor:'pointer'}}>
      {[1,2,3,4,5].map(n => (
        <span key={n} onClick={()=>onChange(n)} style={{filter: n > value ? 'grayscale(1) opacity(0.5)' : 'none'}}>
          <i className={n <= value ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
        </span>
      ))}
    </div>
  );
}

export default function Avis() {
  const [avis, setAvis] = useState([]);
  const [form, setForm] = useState({ nom: '', commentaire: '', note: 5 });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleStar(n) {
    setForm(f => ({ ...f, note: n }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAvis([...avis, { ...form, date: new Date().toLocaleString() }]);
    setForm({ nom: '', commentaire: '', note: 5 });
  }

  return (
    <main style={{background:'#fff', color:'#222', borderRadius:16, padding:'2.5rem', maxWidth:600, margin:'2rem auto', boxShadow:'0 2px 24px #0002'}}>
      <h1>Donner un avis</h1>
      <form onSubmit={handleSubmit} style={{maxWidth: 500, margin:'0 auto'}}>
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input type="text" className="form-control" id="nom" name="nom" value={form.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Note</label>
          <StarRating value={Number(form.note)} onChange={handleStar} />
        </div>
        <div className="mb-3">
          <label htmlFor="commentaire" className="form-label">Commentaire</label>
          <textarea className="form-control" id="commentaire" name="commentaire" value={form.commentaire} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Envoyer l'avis</button>
      </form>
      <section style={{marginTop: '2rem'}}>
        <h2>Avis récents</h2>
        {avis.length === 0 && <p>Aucun avis pour le moment.</p>}
        {avis.map((a, idx) => (
          <div key={idx} style={{background:'#f7f7f7', color:'#222', borderRadius:8, padding:'1rem', marginBottom:12, boxShadow:'0 1px 6px #0001'}}>
            <strong style={{fontSize:'1.1em'}}>{a.nom}</strong> <span style={{color:'#ffb347', fontSize:'1.2em', marginLeft:8}}>
              {[1,2,3,4,5].map(n => (
                <i key={n} className={n <= a.note ? 'fa-solid fa-star' : 'fa-regular fa-star'}></i>
              ))}
            </span> <span style={{fontSize:'0.9em', color:'#888'}}>{a.date}</span>
            <p style={{marginTop:8, fontSize:'1.08em'}}>{a.commentaire}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
