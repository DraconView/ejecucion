import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "../../../../../cssGeneral/CssGeneral.css";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

const datosObtenidos = [
    {
        "id": "AWnzkl4h4RxeDEBW3cEP",
        "estatusPago": "PENDIENTE",
        "numeroGuia": "ASIGNAR",
        "direccion": "PENDIENTE",
        "cartItem": [
            {
                "price": "650",
                "count": 4,
                "id": "YPF4sru2cK6wCIqrI8xL",
                "stock": 700,
                "codeRef": "AGUA MICELAR",
                "idTienda": 1,
                "img": [
                    "https://draconsoftware.com/storage/files/6YAwCY3KZJfGM4CgiK7OIPwS1ocBjfCNIEqkaXpP.jpg"
                ],
                "name": "AGUA MICELAR"
            }
        ],
        "timestamp": {
            "seconds": 1691950205,
            "nanoseconds": 497000000
        },
        "estatusDespacho": "PENDIENTE",
        "timeMs": 1691950205497,
        "total": "$ 2.600,00"
    },
    {
        "id": "DrJjdscGA7c2fFqc0Mnb",
        "estatusPago": "PENDIENTE",
        "timestamp": {
            "seconds": 1691950194,
            "nanoseconds": 937000000
        },
        "numeroGuia": "ASIGNAR",
        "direccion": "PENDIENTE",
        "total": "$ 2.340,00",
        "cartItem": [
            {
                "price": "780",
                "img": [
                    "https://draconsoftware.com/storage/files/mKKSk08BHAntYhIXc1pXE6ntFfHYtCSJvIQ6D9Vb.jpg"
                ],
                "idTienda": 1,
                "codeRef": "CREMAS",
                "name": "CREMAS",
                "count": 3,
                "stock": 700,
                "id": "9TZ6yeGrR6lkMdso9QqG"
            }
        ],
        "estatusDespacho": "PENDIENTE",
        "timeMs": 1691950194937
    },
    {
        "id": "6qLX04VRJaxzIJkuIl1G",
        "total": "$ 500,00",
        "numeroGuia": "ASIGNAR",
        "timestamp": {
            "seconds": 1691950186,
            "nanoseconds": 75000000
        },
        "estatusPago": "PENDIENTE",
        "direccion": "PENDIENTE",
        "estatusDespacho": "PENDIENTE",
        "timeMs": 1691950186075,
        "cartItem": [
            {
                "stock": 550,
                "idTienda": 1,
                "codeRef": "SPRAI",
                "img": [
                    "https://draconsoftware.com/storage/files/jajUifMjcURgNEsNE8Maop33XCg8Dqy8tqnnpQl2.jpg"
                ],
                "id": "PmVGYqcgCCapbMVA6ZRR",
                "name": "SPRAI",
                "count": 1,
                "price": "500"
            }
        ]
    }
]

const ReporteProductos = () => {
  const [contadorLlamadas, setcontadorLlamadas] = useState(0);
  const [datosObtenidos, setdatosObtenidos] = useState([]);
  const [ejemploDatosObtenidos, setejemploDatosObtenidos] = useState([]);
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

  useEffect(() => {
    if (datosObtenidos.length > 0) {
      //console.log("datosObtenidos", datosObtenidos);
    }
  }, [datosObtenidos]);

  useEffect(() => {
    if (datosObtenidos.length > 0) {
      setejemploDatosObtenidos(datosObtenidos);
    }
  }, [datosObtenidos]);

  useEffect(() => {
    if (ejemploDatosObtenidos.length > 0) {
      const productos = ejemploDatosObtenidos.map((item) => item.cartItem);
      setarrayProductos(productos);
      //console.log("productos", productos);
    }
  }, [ejemploDatosObtenidos]);

  return (
    <>
      <div className="contenedorPrincipal">

        <div className="contenedorSecundario">
          <div
            className="contenedorPublicaciones"
            style={{ display: vistaPublicaciones }}
          >
            <div className="alineacionHorizontalWrap">
              {ejemploDatosObtenidos.map((mapeado) => (
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
