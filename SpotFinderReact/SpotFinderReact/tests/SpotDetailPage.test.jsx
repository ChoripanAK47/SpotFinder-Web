import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SpotContext } from '../src/components/SpotContext';
import SpotDetailPage from '../src/pages/SpotDetailPage';

// Datos de prueba
const mockSpots = [
  {
    spotId: '1',
    nombre: 'Parque La Calera',
    descripcion: 'Un hermoso parque para visitar.',
    comuna: 'La Calera',
    fotosUrls: ['/parque.jpg'],
    calificacionPromedio: { seguridad: 4, limpieza: 5, accesibilidad: 5 },
    servicios: { tieneBanos: true, tieneZonasRecreativas: true, tieneComercioCercano: true }
  }
];

// Helper para renderizar con proveedores y rutas
const renderWithRouter = (ui, { providerProps, initialEntries = [] }) => {
  return render(
    <SpotContext.Provider value={providerProps}>
      <MemoryRouter initialEntries={initialEntries}>
        {ui}
      </MemoryRouter>
    </SpotContext.Provider>
  );
};

describe('SpotDetailPage', () => {
  // Prueba 3: Muestra detalles de un spot existente
  test('muestra los detalles correctos para un ID de spot válido', () => {
    const route = '/spot/1';
    renderWithRouter(
      <Routes>
        <Route path="/spot/:id" element={<SpotDetailPage />} />
      </Routes>,
      { providerProps: { spots: mockSpots }, initialEntries: [route] }
    );

    expect(screen.getByRole('heading', { name: /parque la calera/i })).toBeInTheDocument();
    expect(screen.getByText(/un hermoso parque para visitar/i)).toBeInTheDocument();
    expect(screen.getByText(/baños disponibles/i)).toBeInTheDocument();
  });

  // Prueba 4: Muestra mensaje de error para un spot no existente
  test('muestra un mensaje de "Spot no encontrado" para un ID de spot inválido', () => {
    const route = '/spot/999'; // ID que no existe
    renderWithRouter(
      <Routes>
        <Route path="/spot/:id" element={<SpotDetailPage />} />
      </Routes>,
      { providerProps: { spots: mockSpots }, initialEntries: [route] }
    );

    expect(screen.getByRole('heading', { name: /spot no encontrado/i })).toBeInTheDocument();
  });
});