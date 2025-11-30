import './App.css'
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarSecundaria from './components/NavbarSecundaria';
import HomePage from './pages/HomePage';
import SpotDetailPage from './pages/SpotDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import MapPage from './pages/MapPage';
import User from './pages/User';
import NewSpotPage from './pages/NewSpotPage';
import Nosotros from './pages/Nosotros';
import CreateAccount from './pages/CreateAccount';
import Bienvenida from './pages/Bienvenida';
import Administracion from './pages/Administracion';

function App() {
  const location = useLocation();

  // rutas donde NO queremos el padding que crea gap
  const noPaddingPaths = ['/login', '/CreateAccount', '/spots/nuevo'];
  const mainClass = noPaddingPaths.includes(location.pathname) ? '' : 'py-3';

  // rutas donde queremos desactivar el scroll de la ventana
  const noScrollPaths = ['/', '/login', '/CreateAccount', '/spots/nuevo'];

  useEffect(() => {
    if (noScrollPaths.includes(location.pathname)) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // limpiar por si cambia el componente
    return () => document.body.classList.remove('no-scroll');
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
      </Routes>

      {/* mostrar Navbar solo si no estamos en la pantalla de bienvenida */}
      {location.pathname !== '/' && <Navbar />}

      {location.pathname !== '/' && (
        <main className={mainClass}>
          <Routes>
            {/* Rutas que usan el layout con sidebar */}
            <Route path="/home" element={<Layout><HomePage /></Layout>} />
            <Route path="/mapa" element={<Layout><MapPage /></Layout>} />
            <Route path="/spot/:id" element={<Layout><SpotDetailPage /></Layout>} />
            <Route path="/perfil" element={<Layout><ProfilePage /></Layout>} />

            <Route path="/administracion" element={<Administracion />} />

            {/* Rutas sin sidebar */}
            <Route path="/spots/nuevo" element={<NewSpotPage />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/User" element={<User />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
          </Routes>
        </main>
      )}
    </>
  );
}

export default App;