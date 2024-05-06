import React, { useState } from 'react';
import Swal from 'sweetalert2';
import imagen from '../../assets/imagen.png';
import './Login.css';

async function login(username, password) {
  const url = "http://127.0.0.1:6970/login"; // TODO: no quemar la URL
  const data = {
    username: username,
    password: password
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const responseData = await response.json();
    localStorage.setItem('secretAuth', responseData.secretAuth);
    return true;
  } else {
    return false;
  }
}

const Login = ({ setIsAuthenticated }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    if (await login(email, password)) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {

          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: '!Error! al Iniciar sesión',
            text: 'Correo electrónico o contraseña incorrectos.',
            showConfirmButton: true,
          });
        },
      });
    }


  };

  return (
    <div className='login-screen'>
      <div className="login-container">
        <div class="icon-container">
          <img src={imagen} alt="Login logo" class="login-photo" />
        </div>
        <div className="login-box">
          <form onSubmit={handleLogin}>
            <h1>PIARPIS</h1>
            <label htmlFor="email" className=''>Correo Electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder=""
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder=""
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input style={{ marginTop: '12px' }} type="submit" value="Login" />
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Login;
