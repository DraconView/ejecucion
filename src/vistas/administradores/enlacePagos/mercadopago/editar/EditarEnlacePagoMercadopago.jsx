// editarEnFire 220723

import { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "../../../../../cssGeneral/CssGeneral.css";
import ContextCiudadesAsincrono from "../../../../../context/contextCiudades/ContextCiudadesAsincrono";

function EditarCiudades() {
  const { contextCiudades, providerEleccionCiudad } = useContext(CartContext);

  const [contadorLlamadas, setContadorLlamadas] = useState(0)

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");
  const [datos, setdatos] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const [servicio, setservicio] = useState("");
  const [sesiones, setsesiones] = useState("");
  const [enlace, setenlace] = useState("");
  const [plataformaPago, setplataformaPago] = useState("");

     const obtenerRegistrosFirestore = async () => {
      let docRef;
        docRef = db
          .collection("EnlacesPagos");
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
      }
    }, []);
  
  const editarDatos = (esteDato) => {
    setId(esteDato.id);
    setvistaPublicaciones("none");
    setvistaEditor("flex");

    setservicio(esteDato.servicio);
    setsesiones(esteDato.sesiones);
    setenlace(esteDato.enlace);
    setplataformaPago(esteDato.plataformaPago);
  };

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("EnlacesPagos")
      .doc(id)
      .update({
        referencia: servicio+sesiones+plataformaPago,
        servicio: servicio,
        sesiones: sesiones,
        enlace: enlace,
        plataformaPago: plataformaPago,
      })
      .then(() => {
        //console.log("Documento actualizado obtenerRegistrosFirestore");
        obtenerRegistrosFirestore();
      })
      .catch((error) => {
        //console.error("Error al actualizar el documento:", error);
      });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");

    setservicio("");
    setsesiones("");
    setenlace("");
    setplataformaPago("");

  };

  const eliminarRegistrosFirestore = (id) => {
    db.collection("EnlacesPagos")
      .doc(id)
      .delete()
      .then(() => {
        obtenerRegistrosFirestore();
      })
      .catch((error) => {
        //console.error("Error al eliminar el documento:", error);
      });
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");

    setservicio("");
    setsesiones("");
    setenlace("");
    setplataformaPago("");
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
              <span>Servicio:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                disabled
                placeholder="Ingrese la servicio..."
                value={mapeado.servicio}
                onChange={(e) => setservicio(e.target.value)}
              />
            </div>
            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 10px" }}
            >
              <span>Sesiones:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                disabled
                placeholder="Numero de sesiones..."
                value={mapeado.sesiones}
                onChange={(e) => setsesiones(e.target.value)}
              />
            </div>
            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 25px" }}
            >
              <span >
                Enlace:
              </span>
              <textarea
                type="text"
                className="textareaEdicion4"
                disabled
                placeholder="Ingrese el enlace de pago..."
                value={mapeado.enlace}
                onChange={(e) => setenlace(e.target.value)}
              />
            </div>
            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 25px" }}
            >
              <span >
                Plataforma:
              </span>
              <textarea
                type="text"
                className="textareaEdicion3"
                disabled
                placeholder="Ingrese la plataforma de pago..."
                value={mapeado.plataformaPago}
                onChange={(e) => setplataformaPago(e.target.value)}
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
              style={{ margin: "40px 0px 0px 5px" }}
            >
              <span>Ciudad:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                placeholder="Ingrese la servicio..."
                value={servicio}
                onChange={(e) => setservicio(e.target.value)}
              />
            </div>
            <div className="divDividerFormulario" />

            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 15px" }}
            >
              <span>Sesiones:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                placeholder="Ingrese el numero de sesiones..."
                value={sesiones}
                onChange={(e) => setsesiones(e.target.value)}
              />
            </div>
            <div className="divDividerFormulario" />

            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 0px" }}
            >
              <span >Enlace:</span>
              <textarea
                type="text"
                className="textareaEdicion3"
                placeholder="Ingrese el enlace de pago..."
                value={enlace}
                onChange={(e) => setenlace(e.target.value)}
              />
            </div>
            <div className="divDividerFormulario" />

            <div
              className="alineacionHorizontal"
              style={{ margin: "0px 0px 0px 35px" }}
            >
              <span >
                Plataforma:
              </span>
              <textarea
                type="text"
                className="textareaEdicion3"
                placeholder="Ingrese la plataforma de pago..."
                value={plataformaPago}
                onChange={(e) => setplataformaPago(e.target.value)}
              />
            </div>
            <div 
              className="divDividerFormulario"
              style={{ margin: "0px 0px 30px 0px" }}
              />

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
