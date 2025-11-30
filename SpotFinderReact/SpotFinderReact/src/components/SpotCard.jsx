import React from 'react';
import { Link } from 'react-router-dom';

const SpotCard = ({ spot }) => {
  const { spotId, nombre, comuna, fotosUrls } = spot;

  return (
    <div className="col">
      <div className="card h-100 shadow-sm transition-transform hover-scale">
        <Link to={`/spot/${spotId}`} className="text-decoration-none text-dark">
          <img 
            src={fotosUrls[0]} 
            alt={`Foto de ${nombre}`} 
            className="card-img-top shadow-sm"
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => { e.target.onerror = null; e.target.src='[https://placehold.co/600x400/CCCCCC/FFFFFF?text=Spot](https://placehold.co/600x400/CCCCCC/FFFFFF?text=Spot)'; }}
          />
          <div className="card-body">
            <h5 className="card-title fw-bold text-truncate">{nombre}</h5>
            <p className="card-text text-muted">{comuna}</p>
            <div className="d-grid">
              <button className="btn btn-success fw-semibold shadow-sm">Conocer</button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SpotCard;