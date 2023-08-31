const reglasParaMostrarHorariosDisponibles = [
    {
        diasDisponibles: "martes, jueves, viernes",
        horariosInicioFin: "08:00 - 17:00",
        horaDescanso: "12:00 - 14:00",
        diasFestivos: "ninguno",
        duracionCita: ["30", "minutos"],
        formatoHora: "24"
    },
];

function HorasDelDia() {
  const horas = [];
  for (let hora = 8; hora <= 18; hora++) {
    // Agrega ceros iniciales para mantener el formato de hora consistente
    const horaConCeros = hora < 10 ? `0${hora}` : hora;
    const horaFormateada = `${horaConCeros}:00`;
    horas.push(<div key={horaFormateada}>{horaFormateada}</div>);
  }

  return (
    <div>
      <h1>Horas del día</h1>
      <div>{horas}</div>
    </div>
  );
}

export default HorasDelDia;


