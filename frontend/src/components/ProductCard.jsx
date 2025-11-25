import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ item, onVoir }) {
  const { addItem } = useCart();
  // Correction image pâtisserie débutants + fallback
  const [imageUrl, setImageUrl] = useState(() => {
    if (item?.image) return item.image;
    if (item?.titre?.toLowerCase().includes('pâtisserie')) {
      return '/images/Debuter-en-patisserie-1-1280x640.jpg';
    }
    return 'https://via.placeholder.com/400x300';
  });

  const isDemo = item.id >= 100;
  return (
    <div className="col-12 col-md-6 mb-4">
      <article className="card h-100 product-card" style={{ position: 'relative', overflow: 'hidden', background: 'var(--main-bg)', borderRadius: '18px', boxShadow: '0 2px 16px #0002', border: '1px solid #2a2026', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--main-bg)', borderRadius: '12px 12px 0 0', height: 240, minHeight: 240, width: '100%', padding: 0, overflow: 'hidden' }}>
          {isDemo ? (
            <img
              src={imageUrl}
              alt={item.titre}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0', opacity: 0.7 }}
              onError={() => setImageUrl('https://via.placeholder.com/400x300?text=Image+indisponible')}
            />
          ) : (
            <Link to={`/product/${item.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
              <img
                src={imageUrl}
                alt={item.titre}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                onError={() => setImageUrl('https://via.placeholder.com/400x300?text=Image+indisponible')}
              />
            </Link>
          )}
        </div>
        <div className="card-body d-flex flex-column" style={{ paddingRight: 18, paddingBottom: 32, flex: '1 1 auto' }}>
          <div style={{ flex: '1 1 auto' }}>
            <h5 className="card-title" style={{ color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 6px #000' }}>{item.titre}</h5>
            <p className="card-text" style={{ color: '#fff', marginBottom: 12, textShadow: '2px 2px 8px #000', wordBreak: 'break-word', whiteSpace: 'pre-line' }}>{item.description}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-3" style={{ gap: 8 }}>
            <div className="d-flex flex-column" style={{ color: '#fff', fontWeight: 'bold', textShadow: '2px 2px 8px #000' }}>
              <span style={{ fontSize: 20 }}>{item.prix} $CA</span>
              <small style={{ fontSize: 12, fontWeight:600, opacity:0.85 }}>Stock: {item.stock ?? '—'}</small>
            </div>
            <div style={{display:'flex', gap:6, zIndex:2, position:'relative'}}>
              {!isDemo && (
                <Link to={`/product/${item.id}`} className="btn btn-outline-warning" style={{ fontWeight: 600, pointerEvents:'auto', zIndex:2, position:'relative' }}>Voir</Link>
              )}
              <button
                type="button"
                className="btn btn-success"
                style={{ fontWeight:600, pointerEvents:'auto', zIndex:2, position:'relative' }}
                disabled={item.stock !== undefined && item.stock <= 0}
                onClick={()=> addItem(item,1)}
              >
                <i className="fa-solid fa-cart-plus" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
