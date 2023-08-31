import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import CartContext from "../../../../context/CartContext";
import "../../../../cssGeneral/CssGeneral.css";
import ContextCiudadesAsincrono from "../../../../context/contextCiudades/ContextCiudadesAsincrono";

function EditarCiudades() {
  const { contextCiudades, providerEleccionCiudad } = useContext(CartContext);

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");
  const [datos, setdatos] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const [ciudad, setciudad] = useState("");
  const [nombrePublico, setnombrePublico] = useState("");
  const [puntoReferencia, setpuntoReferencia] = useState("");

  useEffect(() => {
    const obtenerDatos = () => {
      db.collection("Ciudades")
        .orderBy("ciudad", "asc")
        .onSnapshot((querySnapshot) => {
          const updatedDocs = [];
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              updatedDocs.push({ ...change.doc.data(), id: change.doc.id });
            }
            if (change.type === "modified") {
              const index = updatedDocs.findIndex((doc) => doc.id === change.doc.id);
              if (index !== -1) {
                updatedDocs[index] = { ...change.doc.data(), id: change.doc.id };
              }
            }
            if (change.type === "removed") {
              const index = updatedDocs.findIndex((doc) => doc.id === change.doc.id);
              if (index !== -1) {
                updatedDocs.splice(index, 1);
              }
            }
          });
          setdatos(updatedDocs);
        });
    };
    obtenerDatos();
  }, []);

  const editarDatos = (esteDato) => {
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
        //console.log("Documento actualizado exitosamente");
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
  };

  const eliminarRegistrosFirestore = (id) => {
    db.collection("Ciudades")
      .doc(id)
      .delete()
      .then(() => {
        //console.log("Documento eliminado exitosamente");
      })
      .catch((error) => {
        //console.error("Error al eliminar el documento:", error);
      });
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
              onClick={() => editarDatos(mapeado)}
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
