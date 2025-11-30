import React from 'react';
import { useSpots } from './SpotContext'; // 1. Importamos el hook del contexto

const Sidebar = () => {
  const { searchTerm, setSearchTerm } = useSpots(); // 2. Obtenemos el estado y la función de búsqueda

  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <img 
          src="/GatoPrisma.gif"
          alt="Avatar de usuario" 
          className="mx-auto img-fluid" // Clase img-fluid para hacerlo responsivo
        />
        <h5 className="card-title fw-bold">Bienvenido a SpotFinder</h5>
        <p className="card-text text-muted small mb-4">
          El lugar adecuado para buscar tu próximo sitio favorito al aire libre 👟
        </p>
        <div className="text-start">
          <label htmlFor="search" className="form-label small fw-medium">Buscar Spot</label>
          <div className="input-group">
            <input 
              type="text" 
              id="search"
              placeholder="Ej: La Calera, Skatepark..."
              className="form-control"
              value={searchTerm} // 3. Conectamos el valor al estado
              onChange={(e) => setSearchTerm(e.target.value)} // 4. Actualizamos el estado al escribir
            />
            <button className="btn btn-success" type="button">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;