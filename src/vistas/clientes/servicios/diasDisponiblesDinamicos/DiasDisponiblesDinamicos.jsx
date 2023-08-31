// ruta: /dias-disponibles-dinamicos
import { useState, useEffect, useContext } from "react"; 
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

function DiasDisponiblesDinamicos() {
 //console.log('llamando a DiasDisponiblesDinamicos');
 //enviar dia seleccionado al context
  const { contextCiudadSeleccionada , contextPuntoReferencia, providerDiaDinamicoSeleccionado } = useContext(CartContext);

  const reglas = [
    {
      //diasDisponibles: "lunes, martes, miércoles , jueves,viernes, sábado,domingo",
      diasDisponibles: "martes, miércoles , jueves,viernes",
      horarioInicioJornada: [8, 0, 0, 0],
      horarioFinJornada: [17, 0, 0, 0], 
      horarioInicioDescanso: [12, 0, 0, 0],
      horarioFinDescanso: [14, 0, 0, 0], 
      diasFestivos: "ninguno",
      duracionCita: ["30", "minutos"],
      rangoDias: 15,
      ciudad: "piriapolis",
    },
  ];

  //.toString() convierte la fecha en un string
  const [proximos15Dias, setProximos15Dias] = useState([]);

  useEffect(() => {
    const hoy = new Date();
    const listaDias = [];
    hoy.setHours(0, 0, 0, 0); // setea la hora a las 00:00
    for (let i = 0; i < reglas[0].rangoDias; i++) {
      const diaFormatoNativo = new Date(
        hoy.getTime() + i * 24 * 60 * 60 * 1000
      );
      const diaString = diaFormatoNativo.toLocaleString("es-ES", { weekday: "long", });
      // Verifica si el día es válido según las reglas de disponibilidad de citas
      if (reglas[0].diasDisponibles.includes(diaString)) {
        listaDias.push(diaFormatoNativo);
      }
    }
    setProximos15Dias(listaDias);
  }, []);

  const enviarDiaSeleccionadoContexto = (dia) => {
    providerDiaDinamicoSeleccionado(dia);
  };

  return (
    <div className="alineacionVertical">
      <div className="divSalirvolverProductosDetallados">
        <Link to="/seleccion-ciudad-cita">
          <HiArrowNarrowLeft
            style={{
              fontSize: "35px",
              margin: "0px 0px 0px 15px",
              color: "#646464",
            }}
          />
        </Link>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoTituloCiudadSeleccionada">{contextCiudadSeleccionada}</span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoPuntoReferenciaSeleccionado">{contextPuntoReferencia}</span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoSeleccioneCategoria">selecciona el día</span>
      </div>
      <div style={{ marginBottom: "20px" }}>
        {proximos15Dias.map((dia, index) => (
          <Link to="/horas-disponibles-dinamicas" key={index} style={{ textDecoration: "none" }}>
          <div 
              className="divFechaDisponible" 
              key={index}
              onClick={() => enviarDiaSeleccionadoContexto(dia)} 
              >
            <div style={{ margin: "0px 5px" }}>
              {dia.toLocaleString("es-ES", { weekday: "long" }  )}
            </div>
            <div style={{ margin: "0px 5px" }}>
              {dia.toLocaleString("es-ES", { day: "numeric" })}
            </div>
            <div style={{ margin: "0px 5px" }}>
              <span> de </span>
            </div>
            <div style={{ margin: "0px 5px" }}>
              {dia.toLocaleString("es-ES", { month: "long" })}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DiasDisponiblesDinamicos;
