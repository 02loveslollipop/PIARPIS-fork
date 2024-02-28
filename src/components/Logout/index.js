import React from 'react';
import Swal from 'sweetalert2';

const Logout = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: 'Cerrar sesión',
      text: 'Seguro que desea salir?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
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
            setIsAuthenticated(false);
          },
        });
      }
    });
  };

  return (
    <button
      style={{ marginLeft: '12px' }}
      className="muted-button"
      onClick={handleLogout}
    >
      Cerrar sesión
    </button>
  );
};

export default Logout;
