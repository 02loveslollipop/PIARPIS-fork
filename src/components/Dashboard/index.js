import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Dashboard.css';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data';

async function deleteParking(id) {
  const url = "http://127.0.0.1:6970http://127.0.0.1:6970/delete"; // TODO: no quemar la URL
  const data = {
    Id: id,
  };
  console.log(localStorage.getItem('secretAuth'));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'hash': localStorage.getItem('secretAuth')
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el vehículo');
  }


}

const Dashboard = ({ setIsAuthenticated }) => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('employees_data'));
    if (data !== null && Object.keys(data).length !== 0) setEmployees(data);
  }, []);

  const handleEdit = id => {
    setSelectedEmployee(id);
    setIsEditing(true);
  };

  const handleDelete = async id => {
    Swal.fire({
      icon: 'warning',
      title: 'Está seguro?',
      text: "No podrá revertir esto!",
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar!',
    }).then(result => {
      if (result.value) {
        try{
          deleteParking(id);

          Swal.fire({
            icon: 'success',
            title: 'Eliminado!',
            text: `${id} ha sido eliminado.`,
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error.message,
            showConfirmButton: true,
          });
        }        
      }
    }).then(() => {
      setTimeout(() => {
        setIsEditing(true);
        setIsEditing(false); // Para que se actualice la tabla
      }, 3000);
    });
  };

  return (
    <div id="table-main-screen">
      <div className="container">
        {!isAdding && !isEditing && (
          <div className='table-screen'>
            <Header
              setIsAdding={setIsAdding}
              setIsAuthenticated={setIsAuthenticated}
            />
            <div style={{ marginTop: '9vh', marginBottom: '4vh' }}></div>
            <div className="table-container">
              <Table
                employees={employees}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        )}
        {isAdding && (
          <Add
            employees={employees}
            setEmployees={setEmployees}
            setIsAdding={setIsAdding}
          />
        )}
        {isEditing && (
          <Edit
            employees={employees}
            selectedEmployee={selectedEmployee}
            setEmployees={setEmployees}
            setIsEditing={setIsEditing}
          />
        )}
      </div>
      <div className="wallpaper"></div>
    </div>
    
  );
};

export default Dashboard;
