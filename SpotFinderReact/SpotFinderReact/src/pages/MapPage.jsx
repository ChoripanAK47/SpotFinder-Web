import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useSpots } from '../components/SpotContext'; // Importamos el hook
import { Link } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: 'calc(94vh - 200px)', // Altura del mapa
  borderRadius: '0.375rem',
  border: '2px solid #0E4749', // Borde de color azul
};

const center = {
  lat: -32.95, // Centrado en la región de Valparaíso
  lng: -71.40
};

const mapOptions = {
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: false,
  fullscreenControl: false,
  scrollwheel: true,
  rotateControl: true,
  minZoom: 5,
  maxZoom: 50,
};

const StarRating = ({ rating, label }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="d-flex align-items-center mb-1 small">
      <span className="me-2" style={{ minWidth: '80px' }}>{label}</span>
      <div>
        {[...Array(totalStars)].map((_, index) => (
          <svg key={index} xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill={index < filledStars ? '#ffc107' : '#e4e5e9'} className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        ))}
      </div>
    </div>
  );
};

const MapPage = () => {
  const { spots } = useSpots(); // Usamos el contexto para obtener los spots

  // 4. Carga del script de Google Maps con IDIOMA y REGIÓN
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    language: 'es',
    region: 'CL'
  });

  const [selectedSpot, setSelectedSpot] = useState(null);

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body p-2">
        <div className="row g-4">
          <div className="col-lg-8">
            <h1 className="card-title h4 fw-bold mb-3">Mapa Interactivo</h1>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              options={mapOptions} // Aplicamos nuestras opciones personalizadas
            >
              {spots.map(spot => (
                <Marker
                  key={spot.spotId}
                  position={spot.ubicacion}
                  onClick={() => setSelectedSpot(spot)}
                />
              ))}
            </GoogleMap>
          </div>
          <div className="col-lg-4">
            <h2 className="h5 fw-bold mb-3">{selectedSpot ? 'Spot Seleccionado' : 'Spot Cercano'}</h2>
            {selectedSpot ? (
              <div className="card h-55 shadow-sm">
                <img
                  src={selectedSpot.fotosUrls[0]}
                  alt={`Foto de ${selectedSpot.nombre}`}
                  className="card-img-top"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{selectedSpot.nombre}</h5>
                  <p className="card-text text-muted">{selectedSpot.comuna}</p>

                  <div className='my-3'>
                    <StarRating rating={selectedSpot.calificacionPromedio.seguridad} label="Seguridad" />
                    <StarRating rating={selectedSpot.calificacionPromedio.limpieza} label="Limpieza" />
                    <StarRating rating={selectedSpot.calificacionPromedio.accesibilidad} label="Accesibilidad" />
                  </div>
                  <div className="col-md-6">
                    <h5 className="fw-bold mb-3">Servicios Disponibles</h5>
                    <ul className="list-unstyled">
                      {selectedSpot.servicios.tieneBanos && <li className="mb-2 d-flex align-items-center"><svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> Baños disponibles</li>}
                      {selectedSpot.servicios.tieneZonasRecreativas && <li className="mb-2 d-flex align-items-center"><svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> Zonas recreativas</li>}
                      {selectedSpot.servicios.tieneComercioCercano && <li className="mb-2 d-flex align-items-center"><svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg> Comercio cercano</li>}
                    </ul>
                  </div>
                  <div className="d-grid">
                    <Link to={`/spot/${selectedSpot.spotId}`} className="btn btn-success fw-semibold">
                      Conocer
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted p-5 border rounded">
                <p>Haz clic en un marcador del mapa para ver los detalles del spot.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
