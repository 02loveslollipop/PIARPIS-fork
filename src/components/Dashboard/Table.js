import React, { useEffect, useState } from 'react';

async function getParkings() {
  const url = "https://02loveslollipop.pythonanywhere.com/get"; // TODO: no quemar la URL
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'hash': localStorage.getItem('secretAuth')
    }
  });
  if (!response.ok) {
    throw new Error('Error al obtener los vehículos');
  }
  return await response.json();
}

const Table = ({ employees, handleEdit, handleDelete }) => {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    async function fetchParkings() {
      try {
        const data = await getParkings();
        setParkings(data);
      } catch (error) {
        console.error('Error fetching parkings:', error);
      }
    }
    fetchParkings();
  }, []);

  parkings.forEach((parking, i) => {
    parking.id = i + 1;
  });

  /*

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  */

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre</th>
            <th>Placa</th>
            <th>Valor del parqueadero</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th colSpan={2} className="text-center">
              Acciones Disponibles (En desarrollo)
            </th>
          </tr>
        </thead>
        <tbody>
          {parkings.length > 0 ? (
            parkings.map((parking, i) => (
              <tr key={parking.id}>
                <td>{i + 1}</td>
                <td>{parking.name}</td>
                <td>{parking.plate}</td>
                <td>{parking.invoice}</td>
                <td>{parking.in_time}</td>
                <td>{parking.out_time} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(parking.id)}
                    className="button muted-button"
                  >
                    Editar
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(parking.id)}
                    className="button muted-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
