import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "../../../../../cssGeneral/CssGeneral.css";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const ReporteProductos = () => {
  const [contadorLlamadas, setcontadorLlamadas] = useState(0);
  const [datosObtenidos, setdatosObtenidos] = useState([]);
  const [id, setid] = useState("");

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  const [arrayProductos, setarrayProductos] = useState([]);

  const [direccion, setdireccion] = useState("");
  const [estatusDespacho, setestatusDespacho] = useState("");
  const [numeroGuia, setnumeroGuia] = useState("");

  const obtenerCantidadRegistrosFirebase = async () => {
    const data = await db
      .collection("OrdenesProductos")
      .orderBy("timestamp", "desc")
      .limit(3)
      .get();
    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setdatosObtenidos(arrayData);
  };

  const obtenerMasRegistrosFirebase = async () => {
    const ultimo = datosObtenidos[datosObtenidos.length - 1];
    const data = await db
      .collection("OrdenesProductos")
      .orderBy("timestamp", "desc")
      .startAfter(ultimo.timestamp)
      .limit(3)
      .get();
    const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setdatosObtenidos([...datosObtenidos, ...arrayData]);
  };

  useEffect(() => {
    if (contadorLlamadas === 0) {
      obtenerCantidadRegistrosFirebase();
      setcontadorLlamadas(1);
    }
  }, [contadorLlamadas]);

  return (
    <>
      <div className="contenedorPrincipal">

        <div className="contenedorSecundario">
          <div
            className="contenedorPublicaciones"
            style={{ display: vistaPublicaciones }}
          >
            <div className="alineacionHorizontalWrap">
              {datosObtenidos.map((mapeado) => (
                <div 
                    key={mapeado.id} 
                    className="recuadroDeRecibo"
                    style={{ margin: "10px 10px 10px 10px" }}
                    >
                  <div className="datosClienteRecibo">
                    <span
                      className="textoNombreClienteRecibo"
                      style={{ marginTop: "5px" }}
                    >
                      Telefono: {mapeado.celularMovil}
                    </span>
                    <span className="textoNombreClienteRecibo">
                      fecha:{" "}
                      {new Date(
                        mapeado.timestamp.seconds * 1000
                      ).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="textoNombreClienteRecibo">
                      hora:{" "}
                      {new Date(
                        mapeado.timestamp.seconds * 1000
                      ).toLocaleTimeString("es-ES", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="divDivider" style={{ marginTop: "3px" }} />

                  <div
                    className="divDivider"
                    style={{ marginTop: "5px", marginBottom: "10px" }}
                  />
                  <div className="divTituloDetallesItem">
                    <div className="cantValor">
                      <span className="spanCantDetalleValor"> CANT </span>
                    </div>
                    <div className="reciboReferenciaProducto">
                      <span className="spanCantDetalleValor"> DETALLE </span>
                    </div>
                    <div className="cantValor">
                      <span className="spanCantDetalleValor"> VALOR </span>
                    </div>
                  </div>
                  {mapeado.cartItem.map((item) => (
                    <div key={item.id}>
                      <div style={{ marginTop: "5px" }}>
                        <Link
                          to={`/item/${item.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div className="divTituloDetallesItem">
                            <div className="cantValor">
                              <span
                                className="spanCantDetalleValor"
                              >
                                {" "}
                                {item.count}{" "}
                              </span>
                            </div>
                            <div className="reciboReferenciaProducto">
                              <span className="spanCantDetalleValor">
                                {" "}
                                {item.name}{" "}
                              </span>
                            </div>
                            <div className="cantValor">
                              <span className="spanCantDetalleValor">
                                {" "}
                                {item.price}{" "}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div style={{ height: "30px" }}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="contenedorPublicacionesBoton">
              <button
                className="botonPublicaciones"
                onClick={() => {
                  obtenerMasRegistrosFirebase();
                }}
              >
                <span className="textoBotonPublicaciones">Cargar mas</span>
              </button>
            </div>
        </div>
        
      </div>
    </>
  );
};

export default ReporteProductos;
