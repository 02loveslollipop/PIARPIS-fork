import React from 'react';
import Swal from 'sweetalert2';
import './Logout.css';


const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Cerrar sesión',
      text: '¿Seguro que desea salir?',
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then(result => {
      if (result.value) {
        Swal.fire({
          timer: 1500,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            localStorage.setItem('is_authenticated', false);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          },
        });
      }
    });
  };

  return (
    <button
      id="navbar__login"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
