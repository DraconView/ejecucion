import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db, auth, storage } from '../../../../firebase';

const AgendarCita2 = () => {
  //console.log('llamando a AgendarCita2');
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [citaTimestamp, setCitaTimestamp] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [error, setError] = useState(null);
  //const nombreInput = useRef(null);
  const [nombreInput, setNombreInput] = useState(null);

  useEffect(() => {
    getHorariosDisponibles();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fecha") {
      const timestamp = new Date(`${value} ${hora}`).getTime();
      setCitaTimestamp(timestamp);
    } else if (name === "hora") {
      const timestamp = new Date(`${fecha} ${value}`).getTime();
      setCitaTimestamp(timestamp);
    }
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "fecha") {
      setFecha(value);
    } else if (name === "hora") {
      setHora(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si ya hay una cita programada en la fecha y hora seleccionadas
    const citasRef = db.collection("citas");
    const citaQuery = citasRef.where("citaTimestamp", "==", citaTimestamp);

    citaQuery.get().then((querySnapshot) => {
      if (!querySnapshot.empty) {
        setError("Este horario ya está ocupado, por favor seleccione otro horario disponible");
      } else {
        // Agregar la cita a la base de datos
        citasRef.add({
          nombre: nombre,
          fecha: fecha,
          hora: hora,
          citaTimestamp: citaTimestamp,
        });

        // Actualizar los horarios disponibles
        getHorariosDisponibles();

        // Reiniciar el estado del formulario
        setNombre("");
        setFecha("");
        setHora(""); 
        setCitaTimestamp(null);
        setError(null);

        // Mostrar mensaje de éxito
        alert("La cita ha sido agendada exitosamente");

        // Opcional: Enfocar el primer campo del formulario
        nombreInput.current.focus();
      }
    });
  };

  const getHorariosDisponibles = () => {
    // Obtener los horarios disponibles de la base de datos
    const horariosRef = db.collection("horarios");
    const horariosQuery = horariosRef.orderBy("hora");

    horariosQuery.get().then((querySnapshot) => {
      const horarios = [];
      querySnapshot.forEach((doc) => {
        horarios.push(doc.data().hora);
      });
      setHorariosDisponibles(horarios);
    });
  };

  return (
<form onSubmit={handleSubmit}>
  <label>
    Nombre del paciente:
    <input type="text" name="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)} ref={setNombreInput} />
  </label>
  <label>
    Fecha:
    <input type="date" name="fecha" value={fecha} onChange={(event) => setFecha(event.target.value)} />
  </label>
  <label>
    Hora:
    <select name="hora" value={hora} onChange={(event) => setHora(event.target.value)}>
      {horariosDisponibles.map((hora) => (
        <option key={hora} value={hora}>
          {hora}
        </option>
      ))}
    </select>
  </label>
  {error && <p>{error}</p>}
  <button type="submit">Agendar Cita</button>
</form>
  );
};

export default AgendarCita2;
