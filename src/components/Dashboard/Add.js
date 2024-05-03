import React, { useState } from 'react';
import Swal from 'sweetalert2';

/* 
{"Id": "1", "name": "test", "plate": "test", "invoice": "test", "inicial_time": "test"}
*/

async function addParking(name, plate, invoice, inicial_time, final_time) {
  const url = "https://02loveslollipop.pythonanywhere.com/insert"; // TODO: no quemar la URL
  const data = {
    name: name,
    plate: plate,
    invoice: invoice,
    inicial_time: inicial_time,
    final_time: final_time
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
    throw new Error('Error al agregar el vehículo');
  }


}


const Add = ({ employees, setEmployees, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = async e => {
    e.preventDefault();



    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Debe llenar todos los campos.',
        showConfirmButton: true,
      });
    }

    try {
      await addParking(firstName, lastName, email, salary, date);
    }
    catch (error) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        showConfirmButton: true,
      });
    }

    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ha sido añadido.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className='edit-screen'>
      <div classname="edit-container">
        <div className="edit-box">
          <form onSubmit={handleAdd}>
            <h1>Añadir vehículo</h1>
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
              <input type="submit" value="Agregar" />
              <input
                style={{ marginLeft: '12px' }}
                className="muted-button"
                type="submit"
                value="Cancelar"
                onClick={() => setIsAdding(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
