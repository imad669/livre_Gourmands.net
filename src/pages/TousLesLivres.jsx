
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

export default function TousLesLivres() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/ouvrages')
      .then(res => setItems(res.data))
      .catch(err => setError(err.message || 'Erreur'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-custom" style={{marginTop:'2.5rem'}}>
      <h1 style={{color:'#ffb347', fontWeight:800, marginBottom:'2rem'}}>Tous les livres</h1>
      {loading && <p>Chargement...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {items.length === 0 && !loading && !error && (
          <div className="alert alert-warning">Aucun livre trouvé.</div>
        )}
        {items.map(livre => (
          <ProductCard key={livre.id} item={livre} />
        ))}
      </div>
    </div>
  );
}