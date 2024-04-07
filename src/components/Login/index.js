import React, { useState } from 'react';
import Swal from 'sweetalert2';
import imagen from '../../assets/imagen.jpg';

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'qwerty';

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('qwerty');

  const handleLogin = e => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
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
    <div className="custom-container">
      <form onSubmit={handleLogin}>
        <h1>Inicio de sesión - PIARPIS</h1>
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" />
      </form>
      <img src={imagen} alt="Imagen" />
    </div>
  );
};

export default Login;
