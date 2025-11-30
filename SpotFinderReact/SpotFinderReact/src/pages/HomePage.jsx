import React, { useState, useMemo } from 'react';
import { useSpots } from '../components/SpotContext';
import SpotCard from '../components/SpotCard';

const filters = ['Todos', 'Mejor Valoradas', 'Distancia', 'Skateparks', 'Miradores', 'Parques', 'Plazas', 'Urbano'];

const HomePage = () => {
  const { spots, searchTerm } = useSpots(); // 1. Obtenemos spots y el término de búsqueda
  const [activeFilter, setActiveFilter] = useState('Todos');

  // 2. Lógica de filtrado y ordenamiento
  const filteredSpots = useMemo(() => {
    // Primero, filtramos por el término de búsqueda
    let spotsToShow = spots.filter(spot => {
      const term = searchTerm.toLowerCase();
      return (
        spot.nombre.toLowerCase().includes(term) ||
        spot.comuna.toLowerCase().includes(term) ||
        spot.descripcion.toLowerCase().includes(term)
      );
    });

    // Luego, aplicamos el filtro de categoría
    switch (activeFilter) { 
      case 'Todos':
        // No se necesita hacer nada, ya tenemos todos los spots
        break;
      case 'Mejor Valoradas':
        spotsToShow.sort((a, b) => {
          const avgA = (a.calificacionPromedio.seguridad + a.calificacionPromedio.limpieza + a.calificacionPromedio.accesibilidad) / 3;
          const avgB = (b.calificacionPromedio.seguridad + b.calificacionPromedio.limpieza + b.calificacionPromedio.accesibilidad) / 3;
          return avgB - avgA; // Orden descendente
        });
        break;
      // Para los filtros de categoría, buscamos la palabra en el nombre del spot.
      // Esto se podría mejorar añadiendo una propiedad "categoria" a cada spot.
      case 'Skateparks':
      case 'Parques':
      case 'Plazas':
      case 'Miradores':
        spotsToShow = spotsToShow.filter(spot => spot.nombre.toLowerCase().includes(activeFilter.slice(0, -1).toLowerCase()));
        break;
      case 'Distancia':
        // La lógica de distancia es más compleja, requiere la ubicación del usuario.
        // Por ahora, solo mostramos un alert.
        alert('La funcionalidad de filtrar por distancia estará disponible próximamente.');
        break;
      default:
        break;
    }
    return spotsToShow;
  }, [spots, activeFilter, searchTerm]);

  return (
    <div className="card shadow-sm-fluid">
      <div className="card-body p-1">
        <div className="pb-3 mb-4 border-bottom">
          <h1 className="card-title h4 fw-bold">Filtrar Spots</h1>
          <div className="d-flex flex-wrap gap-2 mt-3">
            {filters.map(filter => ( // 3. Botones de filtro dinámicos
              <button 
                key={filter} 
                type="button" 
                className={`btn btn-sm ${activeFilter === filter ? 'btn-success' : 'btn-outline-secondary'}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {filteredSpots.map(spot => ( // 4. Mapeamos sobre los spots filtrados
            <SpotCard key={spot.spotId} spot={spot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;