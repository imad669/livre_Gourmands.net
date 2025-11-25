import React from 'react'
import { Link } from 'react-router-dom'

export default function CarouselFeatured({ items = [] }){
  const slides = items.slice(0,3)
  if(slides.length === 0) return null

  return (
    <div id="featuredCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((it, idx) => (
          <div key={it.id || idx} className={`carousel-item ${idx===0 ? 'active' : ''}`}>
            <div className="d-flex justify-content-center align-items-center" style={{height:300, background:'#eee'}}>
              <img src={it.image || 'https://via.placeholder.com/800x300'} className="d-block" alt={it.titre} style={{maxHeight:280, objectFit:'cover'}} />
            </div>
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
              <h5>{it.titre}</h5>
              <p className="mb-0">{it.description ? it.description.substring(0,100) + '...' : ''}</p>
              <Link to={`/product/${it.id}`} className="btn btn-sm btn-primary mt-2">Voir</Link>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#featuredCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#featuredCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}
