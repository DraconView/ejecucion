import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import CartContext from "../../../../context/CartContext";
import "../../../../cssGeneral/CssGeneral.css";
import ContextCiudadesAsincrono from "../../../../context/contextCiudades/ContextCiudadesAsincrono";

function EditarCiudades() {
  const { contextCiudades, providerEleccionCiudad } = useContext(CartContext);

  const [contadorLlamadas, setContadorLlamadas] = useState(0)

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  const [datos, setdatos] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const [ciudad, setciudad] = useState("");
  const [nombrePublico, setnombrePublico] = useState("");
  const [puntoReferencia, setpuntoReferencia] = useState("");

  const convertirFechaHoraSeleccionadaMilisegundos = () => {
    const fecha = new Date();
    const fechaMilisegundos = fecha.getTime().toString();
    //console.log("fechaMilisegundos", fechaMilisegundos);
    return fechaMilisegundos;
  };

  const actualizarMarcaDeTiempo = () => {
    db.collection("MarcasDeTiempos")
      .doc("bTmLy0pYu08yt87vO4bI")
      .update({
        ciudadesMcFire: convertirFechaHoraSeleccionadaMilisegundos(),
      })
      .then(() => {
        //console.log("Documento actualizado obtenerRegistrosFirestore");
      })
      .catch((error) => {
        //console.error("Error al actualizar el documento:", error);
      });
  };

  const obtenerRegistrosFirestore = async () => {
    let docRef;
    docRef = db
      .collection("Ciudades");
    const querySnapshot = await docRef.get();
    if (querySnapshot.size === 0) {
      //console.log('No existen resultados');
    }
    const cities = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setdatos(cities);
  };

  useEffect(() => {
    if (contadorLlamadas === 0) {
      obtenerRegistrosFirestore();
      setContadorLlamadas(contadorLlamadas + 1)
      //console.log("se llamo obtenerRegistrosFirestore desde useEffect")
    }
  }, []);

  const editarRegistros = (esteDato) => {
    setId(esteDato.id);
    setvistaPublicaciones("none");
    setvistaEditor("flex");

    setciudad(esteDato.ciudad);
    setnombrePublico(esteDato.nombrePublico);
    setpuntoReferencia(esteDato.puntoReferencia);
  };

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("Ciudades")
      .doc(id)
      .update({
        ciudad: ciudad,
        nombrePublico: nombrePublico,
        puntoReferencia: puntoReferencia,
      })
      .then(() => {
        obtenerRegistrosFirestore();
      })
      .catch((error) => {
        //console.error("Error al actualizar el documento:", error);
      });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");

    setciudad("");
    setnombrePublico("");
    setpuntoReferencia("");
    actualizarMarcaDeTiempo();
  };

  const eliminarRegistrosFirestore = (id) => {
    db.collection("Ciudades")
      .doc(id)
      .delete()
      .then(() => {
        obtenerRegistrosFirestore();
      })
      .catch((error) => {
        //console.error("Error al eliminar el documento:", error);
      });
    actualizarMarcaDeTiempo();
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");

    setciudad("");
    setnombrePublico("");
    setpuntoReferencia("");
  };

  return (
    <div className="alineacionVertical">
      <div
        className="estiloListaEdicion"
        style={{ display: `${vistaPublicaciones}` }}
      >
        {datos.map((mapeado, index) => (
          <div
            key={index}
            className="CssEditarCiudades"
            style={{ margin: "15px 15px 15px 15px" }}
          >
            <div
              className="alineacionHorizontal"
              style={{ margin: "5px 0px 0px 0px" }}
            >
              <span>Ciudad:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                disabled
                placeholder="Ingrese la ciudad..."
                value={mapeado.ciudad}
                onChange={(e) => setciudad(e.target.value)}
              />
            </div>
            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 0px" }}
            >
              <span>Publico:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                disabled
                placeholder="Ingrese el nombre al publico..."
                value={mapeado.nombrePublico}
                onChange={(e) => setnombrePublico(e.target.value)}
              />
            </div>
            <div className="divCasillaEstatusServicosDescripcion">
              <span className="tituloObservacionTratamiento">
                Punto de referencia
              </span>
            </div>
            <div className="divCasillaDescripcionServicio">
              <textarea
                type="text"
                rows="5"
                className="casillaDescripcionServicio2"
                placeholder="Punto de referencia..."
                value={mapeado.puntoReferencia}
                onChange={(e) => setpuntoReferencia(e.target.value)}
              />
            </div>
            <div
              className="divBotonContinuar"
              onClick={() => editarRegistros(mapeado)}
            >
              <span className="textoBotonRegistrarCliente">Editar</span>
            </div>
            <div
              className="divBotonContinuar"
              onClick={() => eliminarRegistrosFirestore(mapeado.id)}
            >
              <span className="textoBotonRegistrarCliente">Eliminar</span>
            </div>
          </div>
        ))}
      </div>

      {/* - - - - - - - - - VISTA EDITOR - - - - - - - - - */}

      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaEditor}` }}
      >
        <form>
          <div className="alineacionVertical">
            <div
              className="alineacionHorizontal"
              style={{ margin: "5px 0px 0px 0px" }}
            >
              <span>Ciudad:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                placeholder="Ingrese la ciudad..."
                value={ciudad}
                onChange={(e) => setciudad(e.target.value)}
              />
            </div>
            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 0px" }}
            >
              <span>Publico:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                placeholder="Ingrese el nombre al publico..."
                value={nombrePublico}
                onChange={(e) => setnombrePublico(e.target.value)}
              />
            </div>
            <div className="divCasillaEstatusServicosDescripcion">
              <span className="tituloObservacionTratamiento">
                Punto de referencia
              </span>
            </div>
            <div className="divCasillaDescripcionServicio">
              <textarea
                type="text"
                rows="5"
                className="casillaDescripcionServicio2"
                placeholder="Punto de referencia..."
                value={puntoReferencia}
                onChange={(e) => setpuntoReferencia(e.target.value)}
              />
            </div>
            <div onClick={volverEdicion} className="divBotonContinuar">
              <span className="textoBotonRegistrarCliente">CANCELAR</span>
            </div>
            <button
              className="divTextoBotonGuardar"
              type="submit"
              onClick={actualizarRegistrosFirestore}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      {contextCiudades.length === 0 && <ContextCiudadesAsincrono />}
    </div>
  );
}

export default EditarCiudades;
