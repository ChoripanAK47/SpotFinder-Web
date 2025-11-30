import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../assets/cssViejos/perfil.css'; 
import fotoPerfil from '../assets/images/fotoperfil.jpg';

const User = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <main className="fondo-ritual">
      <div className="envoltorio-user">
        <section className="carta-dinamica-fluid text-center">
          <img src={fotoPerfil} className="Foto-perfil" alt="Foto de perfil" />
          <h4 id="nombre" className="mt-3">
            {user?.nombre} {user?.apellido || ''}
          </h4>
          <hr style={{ borderTop: '2px solid black', width: '90%', margin: '0 auto 20px' }} />
          <p className="text-muted">Nombre: {user?.nombre || 'No disponible'}</p>
          <p className="text-muted">Apellido: {user?.apellido || 'No disponible'}</p>
          <p className="text-muted">Género: {user?.genero || 'No disponible'}</p>
          <p className="text-muted">Correo: {user?.email || 'No disponible'}</p>
          <p className="text-muted">Rol: {user?.rol || 'No disponible'}</p>
          <span className="badge bg-success mb-3">Activo</span>
          <hr style={{ borderTop: '2px solid black', width: '90%', margin: '0 auto 20px' }} />
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </section>
      </div>
    </main>
  );
};

export default User;
