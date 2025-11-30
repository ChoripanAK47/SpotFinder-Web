import React from 'react';
import { Link, NavLink } from 'react-router-dom';


const NavbarSecundaria = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#06402B' , opacity: 0.98}}>
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="">Filtrar Spots</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="">Todos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="">Mejor Valoradas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="">Distancia</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="">Parques</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="">Plazas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="">Skateparks</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSecundaria;