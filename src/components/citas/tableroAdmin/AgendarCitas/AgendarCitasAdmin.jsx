import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth, storage } from '../../firebase';

const AgendarCitasAdmin = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    //obtenerCitas();
    getHorariosDisponibles();
  }, []); 

  
  const obtenerCitas = () => { // funcional
    const citasRef = db.collection("citas");
    citasRef
      .orderBy('fecha', 'asc')
      .get()
      .then((querySnapshot) => {
        const citas = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setCitas(citas);
        //console.log(citas)
      })
      .catch((error) => {
        //console.error('Error al obtener las citas:', error);
      });
  };

  /* version 1 
  const getHorariosDisponibles = () => {
    // Obtener la colección de citas de la base de datos
    const citasRef = db.collection("citas");

    // Obtener los horarios ya ocupados
    citasRef.get().then((querySnapshot) => {
      const horariosOcupados = querySnapshot.docs.map((doc) => doc.data().timestamp);

      // Obtener los horarios disponibles
      const horariosDisponibles = [];
      const horaInicial = 8;
      for (let i = horaInicial; i <= 18; i++) {
        if (i < 10) {
          horariosDisponibles.push(`0${i}:00`);
        } else {
          horariosDisponibles.push(`${i}:00`);
        }
      }
      this.setState({
        horariosDisponibles: horariosDisponibles.filter((hora) => !horariosOcupados.includes(hora)),
      });
    });
  }; */

  const getHorariosDisponibles = () => { // este codigo ess
    const citasRef = db.collection("citas");
    citasRef.get().then((querySnapshot) => {
      const horariosOcupados = querySnapshot.docs.map((doc) => doc.data().timestamp);
      const horariosDisponibles = [];
      const horaInicial = 8;
      for (let i = horaInicial; i <= 18; i++) {
        if (i < 10) {
          horariosDisponibles.push(`0${i}:00`);
        } else {
          horariosDisponibles.push(`${i}:00`);
        }
      }
      this.setState({
        horariosDisponibles: horariosDisponibles.filter((hora) => !horariosOcupados.includes(hora)),
      });
    });
  };

  // creame una vista 

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2>Lista de citas programadas</h2>
        </div>
        <div className="col-md-6 text-right">
          <Link to="/agendar-cita" className="btn btn-primary">
            Agendar cita
          </Link>
        </div>
      </div>
      <hr />
      {citas.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.nombre}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay citas programadas.</p>
      )}
    </div>
  );
};

export default AgendarCitasAdmin;
