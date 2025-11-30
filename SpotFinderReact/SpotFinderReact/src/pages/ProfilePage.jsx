import React from 'react';
import { useSpots } from '../components/SpotContext';
import SpotCard from '../components/SpotCard';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { spots, savedSpots } = useSpots();

  // Filtramos la lista completa de spots para obtener solo los que están guardados
  const favoriteSpots = spots.filter(spot => savedSpots.includes(spot.spotId));

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h1 className="card-title h4 fw-bold">Mis Lugares Guardados</h1>
        {favoriteSpots.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mt-3">
            {favoriteSpots.map(spot => (
              <SpotCard key={spot.spotId} spot={spot} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted p-5 border rounded mt-4">
            <p className="mb-3">Aún no has guardado ningún spot.</p>
            <Link to="/" className="btn btn-success">Explorar Spots</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
