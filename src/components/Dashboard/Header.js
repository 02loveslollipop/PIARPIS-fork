import React from 'react';
import './Dashboard.css';
import imagen from '../../assets/imagen.png';
import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
      <div id="menu">
        <nav class="navbar">
          <h1 class="navbar__title">PIARPIS</h1>
            <div class="navbar__links-container">
              <ul class = "navbar__links">
                 
                <li><a id='navbar__button' onClick={() => setIsAdding(true)}>Agregar</a></li>
              </ul>
            </div>
          <div class="login_container">
            <Logout setIsAuthenticated={setIsAuthenticated} />
          </div>
        </nav>
      </div>

  );
};

/* 
      <h1>Bienvenido a PIARPIS</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <button onClick={() => setIsAdding(true)}>Agregar un Nuevo Vehículo</button>
        
      </div>
*/

export default Header;
