// src/components/SpotContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SpotContext = createContext();
export const useSpots = () => useContext(SpotContext);

const API = '';

export const SpotProvider = ({ children }) => {
  const { user } = useAuth();
  const [spots, setSpots] = useState([]);
  const [savedSpots, setSavedSpots] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch("/api/v1/spots")
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar spots');
        return res.json();
      })
      .then(data => {
        // Mapear cada spot del backend al formato que usa la UI
        const mapped = data.map(s => ({
          // backend devuelve 'id' (Long) y 'fotos' (List<String>)
          spotId: String(s.id ?? s.spotId ?? ''), // tolerancia
          nombre: s.nombre,
          descripcion: s.descripcion,
          ubicacion: { lat: s.lat ?? (s.ubicacion?.lat), lng: s.lng ?? (s.ubicacion?.lng) },
          fotosUrls: s.fotos ?? s.fotosUrls ?? [],
          comuna: s.comuna,
          calificacionPromedio: s.calificacionPromedio || { seguridad: 0, limpieza: 0, accesibilidad: 0 },
          servicios: s.servicios || { tieneBanos: false, tieneZonasRecreativas: false, tieneComercioCercano: false }
        }));
        setSpots(mapped);
      })
      .catch(err => {
        console.error(err);
        // fallback: dejar spots vacío o cargar local data si quieres
      });
  }, []);

  useEffect(() => {
    if (user) {
      const storedSavedSpots = localStorage.getItem(`savedSpots_${user.id}`);
      setSavedSpots(storedSavedSpots ? JSON.parse(storedSavedSpots) : []);
    } else {
      setSavedSpots([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`savedSpots_${user.id}`, JSON.stringify(savedSpots));
    }
  }, [savedSpots, user]);

  const addSpot = (newSpotData) => {
    // Si quieres que la UI agregue inmediatamente el spot (optimistic), lo mapeamos
    setSpots(prev => {
      const maxId = prev.reduce((max, spot) => {
        const currentId = parseInt(spot.spotId, 10);
        return currentId > max ? currentId : max;
      }, 0);
      const newSpot = {
        ...newSpotData,
        spotId: (maxId + 1).toString(),
        calificacionPromedio: { seguridad: 0, limpieza: 0, accesibilidad: 0 },
      };
      return [newSpot, ...prev];
    });
  };

  const toggleSaveSpot = (spotId) => {
    setSavedSpots(prevSaved => {
      if (prevSaved.includes(spotId)) return prevSaved.filter(id => id !== spotId);
      return [...prevSaved, spotId];
    });
  };

  const value = { spots, addSpot, savedSpots, toggleSaveSpot, searchTerm, setSearchTerm };
  return <SpotContext.Provider value={value}>{children}</SpotContext.Provider>;
};