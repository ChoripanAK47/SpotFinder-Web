import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Bienvenida.css';

const Bienvenida = () => {
  const navigate = useNavigate();

  return (
    <div className="bienvenida">
      <div className="bienvenida-card">
        <h1 className="bienvenida-title">¡Bienvenido a SpotFinder!</h1>
        <p className="bienvenida-sub">Descubre y comparte tus lugares favoritos.<br /> En SpotFinder encontrarás tu lugar favorito cercano a tu zona.</p>
        <div className="card-body text-center mb-5">
        <img 
          src="/GatoPrisma.gif"
          alt="Avatar de usuario" 
          className="mx-auto img-fluid"
        />
        </div>
        <div className="bienvenida-actions">
          <button className="btn btn-primary" onClick={() => navigate('/home')}>
            Continuar
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/login')}>
            Unirse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bienvenida;