import React, { useState } from 'react';
import Swal from 'sweetalert2';

async function editParking(id,name, plate, invoice, inicial_time, final_time) {
  const url = "http://127.0.0.1:6970/update"; // TODO: no quemar la URL
  const data = {
    Id: id,
    new_name: name,
    new_plate: plate,
    new_invoice: invoice,
    new_inicial_time: inicial_time,
    new_final_time: final_time
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
    throw new Error('Error al editar el vehículo');
  }


}


const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [salary, setSalary] = useState(null);
  const [date, setDate] = useState(null);
  const id = selectedEmployee

  const handleUpdate = async e => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Debe llenar todos los campos.',
        showConfirmButton: true,
      });
    }

    
    try{
      await editParking(id,firstName, lastName, email, salary, date);
      Swal.fire({
        icon: 'success',
        title: 'Actualizado!',
        text: `${firstName}, placa: ${lastName} ha sido actualizado.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    catch (error) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className='edit-screen'>
      <div classname="edit-container">
        <div className="edit-box">
          <form onSubmit={handleUpdate}>
            <h1>Editar vehículo</h1>
            <label htmlFor="firstName">Nombre</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Placa</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor="email">Valor parqueadero ($)</label>
            <input
              id="email"
              type="number"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="salary">Fecha inicio</label>
            <input
              id="salary"
              type="date"
              name="salary"
              value={salary}
              onChange={e => setSalary(e.target.value)}
            />
            <label htmlFor="date">Fecha fin</label>
            <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <div style={{ marginTop: '30px' }}>
              <input type="submit" value="Actualizar" />
              <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="submit"
                value="Cancelar"
                onClick={() => setIsEditing(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
