import { useState, useEffect, useContext } from "react";
import "./../../../../cssGeneral/CssGeneral.css";
import CartContext from "../../../../context/CartContext";
import { db } from "./../../../../firebase"; // No se están utilizando auth y storage, por lo que se pueden quitar de aquí
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";

function DiasDisponiblesCalendario() {
  const {
    contextCiudadSeleccionada,
    contextPuntoReferencia,
    providerDiaDinamicoSeleccionado,
    contextUsuarioLogueado,
    contextCelularMovil
  } = useContext(CartContext);

  const [datos, setdatos] = useState([]);
  const [conteo, setConteo] = useState(0);

  const obtenerDiasDisponibles = async () => {
    const data = await db
      .collection("DiasDisponiblesCalendario")
      .where("ciudad", "==", contextUsuarioLogueado.displayName)
      .get();
    const arrayOrdenado = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a, b) => {
      if (a.diaCalendario < b.diaCalendario) { return -1; }
      if (a.diaCalendario > b.diaCalendario) { return 1; }
      return 0;
    });
    setdatos(arrayOrdenado);
    setConteo(1);
  };

  if (conteo === 0) {
    obtenerDiasDisponibles();
  }

  const enviarDiaSeleccionadoContexto = (dia) => {
    providerDiaDinamicoSeleccionado(dia);
  };

  // funcion organizar por fecha ejemploObjetoDiasDisponiblesCalendario


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
        <span className="textoTituloCiudadSeleccionada">
          {contextUsuarioLogueado.displayName}
        </span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoPuntoReferenciaSeleccionado">
          {contextPuntoReferencia}
        </span>
      </div>
      <div className="divTituloClienteSeleccioneEldia">
        <span className="textoSeleccioneCategoria">Selecciona el día</span>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <div className="n">
          {datos.length === 0 ? (
            <div>Selecciona un día</div>
          ) : (
            datos.map((dia, index) => (
              <Link to="/horas-disponibles-calendario" key={index} style={{ textDecoration: "none" }}>
                <div key={index}
                  className="divFechaDisponible"
                  onClick={() => enviarDiaSeleccionadoContexto(dia)}
                >
                  <span>{dia.diaCalendario
                    .toDate()
                    .toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    }
                    )}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DiasDisponiblesCalendario;

const ejemploObjetoDiasDisponiblesCalendario = [
  {
    "horariosBloqueados": [],
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "diaCalendario": {
      "seconds": 1688860800,
      "nanoseconds": 0
    },
    "fiJo": [
      18,
      30,
      0,
      0
    ],
    "ciudad": "MINAS",
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "inJo": [
      9,
      0,
      0,
      0
    ],
    "id": "00A06WWJ2tUxjMTlJA5k"
  },
  {
    "horariosBloqueados": [
      {
        "finBloqueo": [
          12,
          0,
          0,
          0
        ],
        "inicioBloqueo": [
          8,
          0,
          0,
          0
        ]
      }
    ],
    "diaCalendario": {
      "seconds": 1691020800,
      "nanoseconds": 0
    },
    "fiJo": [
      21,
      0,
      0,
      0
    ],
    "ciudad": "MINAS",
    "inJo": [
      10,
      0,
      0,
      0
    ],
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "id": "MAUHAkGjxaearYa7bNjc"
  },
  {
    "ciudad": "MINAS",
    "inDe": [
      12,
      0,
      0,
      0
    ],
    "fiJo": [
      18,
      0,
      0,
      0
    ],
    "fiDe": [
      14,
      0,
      0,
      0
    ],
    "inJo": [
      9,
      0,
      0,
      0
    ],
    "horariosBloqueados": [],
    "diaCalendario": {
      "seconds": 1689552000,
      "nanoseconds": 0
    },
    "id": "UggA0mSvHo4XE4udQxpN"
  }
]
