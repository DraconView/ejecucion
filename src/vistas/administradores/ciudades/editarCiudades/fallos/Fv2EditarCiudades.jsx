import { useContext, useEffect, useState } from "react";
import CartContext from "../../../../context/CartContext";
import { isEmpty, size } from "lodash";
import { deleteDocument } from "../../../../helpers/AccionesbdFire";
import "./../../../../cssGeneral/CssGeneral.css";
import ContextCiudadesAsincrono from "../../../../context/contextCiudades/ContextCiudadesAsincrono";

import { db, auth, storage } from "../../../../firebase";
import { AiOutlineCaretUp } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { MdPayment, MdDriveFileRenameOutline } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";

const objetoCiudades = [
  {
      "nombrePublico": "MINAS",
      "indiceJerarquia": 0,
      "horaLegible": " 22:52",
      "ciudad": "MINAS",
      "puntoReferencia": "calle Rodó 519, entre 18 de Julio y Treinta y Tres",
      "stock": 1,
      "fechaLegible": "10/5/2023",
      "visibilidad": "ACTIVO",
      "fechaNavegacion": "1052023",
      "timestamp": {
          "seconds": 1683777147,
          "nanoseconds": 314000000
      },
      "id": "1jgi1hSzfy3iUg8QNkd8"
  },
  {
      "indiceJerarquia": 0,
      "fechaLegible": "10/5/2023",
      "nombrePublico": "SAN JOSÉ",
      "timestamp": {
          "seconds": 1683777286,
          "nanoseconds": 128000000
      },
      "visibilidad": "ACTIVO",
      "fechaNavegacion": "1052023",
      "horaLegible": " 22:54",
      "puntoReferencia": "Hostería del Parque, ubicada en Parque Rodó, Ruta 3 km 92,500",
      "stock": 1,
      "ciudad": "SANJOSE",
      "id": "3iPdVCO4f9zbpleOzUf5"
  },
  {
      "horaLegible": " 22:50",
      "fechaNavegacion": "1052023",
      "puntoReferencia": " Hotel El Mirador. Avenida Franklin D. Roosevelt 381, Colonia del Sacramento, Departamento de Colonia",
      "nombrePublico": "COLONIA DEL SACRAMENTO",
      "timestamp": {
          "seconds": 1683777024,
          "nanoseconds": 958000000
      },
      "stock": 1,
      "ciudad": "COLONIADELSACRAMENTO",
      "fechaLegible": "10/5/2023",
      "visibilidad": "ACTIVO",
      "indiceJerarquia": 0,
      "id": "4X4lXTHnrpYO9bulMZRd"
  },
  {
      "fechaNavegacion": "1052023",
      "nombrePublico": "TRINIDAD",
      "horaLegible": " 22:55",
      "timestamp": {
          "seconds": 1683777336,
          "nanoseconds": 903000000
      },
      "visibilidad": "ACTIVO",
      "ciudad": "TRINIDAD",
      "stock": 1,
      "puntoReferencia": "Hotel Maxim, calle Alfredo J. Puig 750 esquina Treinta y Tres",
      "indiceJerarquia": 0,
      "fechaLegible": "10/5/2023",
      "id": "CESl881tKLB1E3BdOtfN"
  },
  {
      "nombrePublico": "ROSARIO",
      "ciudad": "ROSARIO",
      "horaLegible": " 22:54",
      "fechaNavegacion": "1052023",
      "puntoReferencia": "calle Virrey Arredondo 812 (frente a óptica Visión)",
      "fechaLegible": "10/5/2023",
      "visibilidad": "ACTIVO",
      "stock": 1,
      "indiceJerarquia": 0,
      "timestamp": {
          "seconds": 1683777260,
          "nanoseconds": 672000000
      },
      "id": "NLUU22rkHrQLXjnvEP9z"
  },
  {
      "stock": 1,
      "puntoReferencia": "Calle 25 de Mayo, casi Rincón (frente al Supermercado TATA)",
      "horaLegible": " 22:51",
      "indiceJerarquia": 0,
      "nombrePublico": "MALDONADO",
      "fechaNavegacion": "1052023",
      "timestamp": {
          "seconds": 1683777096,
          "nanoseconds": 628000000
      },
      "ciudad": "MALDONADO",
      "fechaLegible": "10/5/2023",
      "visibilidad": "ACTIVO",
      "id": "PeIDys6nC1kZV846DYPy"
  },
  {
      "puntoReferencia": "peluquería Stylos, calle Federico Paullier 1319",
      "visibilidad": "ACTIVO",
      "indiceJerarquia": 0,
      "ciudad": "ECILDAPAULLIER",
      "fechaNavegacion": "1052023",
      "stock": 1,
      "nombrePublico": "ECILDA PAULLIER",
      "fechaLegible": "10/5/2023",
      "timestamp": {
          "seconds": 1683777074,
          "nanoseconds": 310000000
      },
      "horaLegible": " 22:51",
      "id": "WTu839cPREeOfwzhoJyz"
  },
  {
      "fechaLegible": "10/5/2023",
      "timestamp": {
          "seconds": 1683777170,
          "nanoseconds": 337000000
      },
      "fechaNavegacion": "1052023",
      "puntoReferencia": "calle Luis Dreyer 1270 esquina Treinta y Tres. Misma entrada de Inmobiliaria Palatina",
      "visibilidad": "ACTIVO",
      "nombrePublico": "NUEVA HELVECIA",
      "stock": 1,
      "horaLegible": " 22:52",
      "ciudad": "NUEVAHELVECIA",
      "indiceJerarquia": 0,
      "id": "ZNPaeVQJLhUgoEYRcMzH"
  },
  {
      "nombrePublico": "TREINTA Y TRES",
      "visibilidad": "ACTIVO",
      "indiceJerarquia": 0,
      "ciudad": "TREINTAYTRES",
      "puntoReferencia": "calle Luis Dreyer 1270 esquina Treinta y Tres. Misma entrada de Inmobiliaria Palatina",
      "horaLegible": " 22:55",
      "fechaLegible": "10/5/2023",
      "stock": 1,
      "timestamp": {
          "seconds": 1683777313,
          "nanoseconds": 432000000
      },
      "fechaNavegacion": "1052023",
      "id": "dYGJ2XwOEfL4uU4FBAEY"
  },
  {
      "stock": 1,
      "horaLegible": " 22:53",
      "nombrePublico": "PIRIÁPOLIS",
      "visibilidad": "ACTIVO",
      "ciudad": "PIRIAPOLIS",
      "fechaNavegacion": "1052023",
      "puntoReferencia": "Hotel Tamariz, Calle Salta 933, casi Av. Francisto Piria",
      "timestamp": {
          "seconds": 1683777195,
          "nanoseconds": 17000000
      },
      "indiceJerarquia": 0,
      "fechaLegible": "10/5/2023",
      "id": "f3mAmaP5FMCMRc2tSj4J"
  },
  {
      "puntoReferencia": "Melo Cowork Dr. Darío Silva 849, frente a plaza Saravia",
      "timestamp": {
          "seconds": 1683777120,
          "nanoseconds": 564000000
      },
      "fechaNavegacion": "1052023",
      "horaLegible": " 22:52",
      "fechaLegible": "10/5/2023",
      "stock": 1,
      "ciudad": "MELO",
      "visibilidad": "ACTIVO",
      "nombrePublico": "MELO",
      "indiceJerarquia": 0,
      "id": "hKwtO63LwnvtZoT5ZPN6"
  },
  {
      "stock": 1,
      "timestamp": {
          "seconds": 1683776977,
          "nanoseconds": 611000000
      },
      "puntoReferencia": "",
      "nombrePublico": "CANELONES",
      "horaLegible": " 22:49",
      "fechaNavegacion": "1052023",
      "ciudad": "CANELONES",
      "visibilidad": "ACTIVO",
      "indiceJerarquia": 0,
      "fechaLegible": "10/5/2023",
      "id": "q4bpHfKgIK013XvhS4nW"
  },
  {
      "fechaNavegacion": "1052023",
      "stock": 1,
      "timestamp": {
          "seconds": 1683777000,
          "nanoseconds": 168000000
      },
      "ciudad": "CARDONA",
      "puntoReferencia": "",
      "fechaLegible": "10/5/2023",
      "visibilidad": "ACTIVO",
      "nombrePublico": "CARDONA",
      "indiceJerarquia": 0,
      "horaLegible": " 22:50",
      "id": "qIcxKsPRjAY6mcjtUpcc"
  },
  {
      "ciudad": "ROCHA",
      "fechaLegible": "10/5/2023",
      "puntoReferencia": "",
      "indiceJerarquia": 0,
      "horaLegible": " 22:54",
      "fechaNavegacion": "1052023",
      "visibilidad": "ACTIVO",
      "nombrePublico": "ROCHA",
      "timestamp": {
          "seconds": 1683777246,
          "nanoseconds": 480000000
      },
      "stock": 1,
      "id": "r418Ekk3CWI0NfaVyHPX"
  },
  {
      "fechaLegible": "10/5/2023",
      "visibilidad": "ACTIVO",
      "horaLegible": " 22:53",
      "timestamp": {
          "seconds": 1683777222,
          "nanoseconds": 506000000
      },
      "fechaNavegacion": "1052023",
      "puntoReferencia": "calle Virrey Arredondo 812 (frente a óptica Visión)",
      "stock": 1,
      "indiceJerarquia": 0,
      "nombrePublico": "RÍO BRANCO",
      "ciudad": "RIOBRANCO",
      "id": "zLXMh1No0D12Pci7U9TM"
  }
]

const EditarCiudades = ({ criterioBusqueda, tipoDeCampo }) => {
  //console.log("EditarCiudades");

  const { contextCiudades } = useContext(CartContext);

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");
  const [busquedaProductos, setbusquedaProductos] = useState([]);
  const [cartItemServicios, setcartItemServicios] = useState([]);

  useEffect(() => {
    if (contextCiudades && contextCiudades.length > 0) {
      //console.log(contextCiudades, "EditarCiudades");
    }
  }, [contextCiudades]);

  const [bdProductos, setbdProductos] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const [name, setname] = useState("");
  const [observaciones, setobservaciones] = useState("");

  const [estatusPago, setestatusPago] = useState("");
  const [estatusServicio, setestatusServicio] = useState("");

  const deleteTask = async (id) => {
    alert("¿Estas seguro de eliminar esta publicacion?");
    const result = await deleteDocument("OrdenesServicios", id);
    if (!result.statusResponse) {
      setError(result.error); //
      return;
    }
    const filteredTasks = bdProductos.filter((task) => task.id !== id);
    setbdProductos(filteredTasks);
  };

  const editTask = (theTask) => {
    setestatusPago(theTask.estatusPago);
    setestatusServicio(theTask.estatusServicio);
    setobservaciones(theTask.observaciones);
    setname(theTask.name);
    setId(theTask.id);
    setvistaPublicaciones("none");
    setvistaEditor("flex");
  };

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("OrdenesServicios").doc(id).update({
      estatusPago: estatusPago,
      estatusServicio: estatusServicio,
      observaciones: observaciones,
    });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    setobservaciones("");
    setname("");
    setestatusPago("");
    setestatusServicio("");
  };

  return (
    <div className="contenedorAccionesFiltroClientes">
 
      {isEmpty(contextCiudades) && <ContextCiudadesAsincrono />}

      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaPublicaciones}` }}
      >
        {size(objetoCiudades) === 0 ? (
          <div className="cargandoEdicionesProductos">
            <span className="textoCargandoEdicionesProductos">
              ingresa el numero de teléfono del cliente
            </span>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div style={{ marginTop: "30px" }} />
            <div className="estiloListaEdicion">
              {objetoCiudades.map((task) => (
                <div className="divFichaServicioCliente" key={task.id}>
                  <div className="divTotalDatos">
                    <div className="divArrowDropUpPrecio">
                      <div className="divTotalVentaServicio">
                        <AiOutlineCaretUp className="arrowDropUpIcon" />
                        <span className="textoTotalVentaMonto">
                          {task.total}
                        </span>
                      </div>
                    </div>
                  </div>
                  {task.cartItem.map((item) => (
                    <div key={item.id}>
                      <div className="divServioPorRealizar">
                        <span className="textoServioPorRealizar">
                          {item.name}
                        </span>
                        <span className="cantidadSesiones">
                          numero de sesiones: {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="divEstatus">
                    <div
                      className="casillaEstatusServicos"
                      style={{ margin: "7px 0px 7px 0px" }}
                    >
                      <BsCalendarDate className="iconosServicios" />
                      <span className="textoEstatusPago">
                        fecha: {task.fechaMasHoraLegible}
                      </span>
                    </div>
                    <div
                      className="casillaEstatusServicos"
                      style={{ margin: "7px 0px 7px 0px" }}
                    >
                      <MdPayment className="iconosServicios" />
                      <span className="textoEstatusPago">
                        estatus pago: {task.estatusPago}
                      </span>
                    </div>
                    <div
                      className="casillaEstatusServicos"
                      style={{ margin: "7px 0px 7px 0px" }}
                    >
                      <ImPriceTag className="iconosServicios" />
                      <span className="textoEstatusPago">
                        N.º sesion: {task.estatusServicio}
                      </span>
                    </div>

                    <div className="divCasillaEstatusServicosDescripcion">
                      <span className="tituloObservacionTratamiento">
                        OBSERVACIONES DE TRATAMIENTO
                      </span>
                    </div>
                    <div className="divCasillaDescripcionServicio">
                      <textarea
                        type="text"
                        disabled
                        className="casillaDescripcionServicio"
                        placeholder=""
                        value={task.observaciones}
                      />
                    </div>
                  </div>
                  <div
                    className="contenedorBotonEditarServicio"
                    onClick={() => editTask(task)}
                  >
                    <div className="divBotonEditarServicio">
                      <MdDriveFileRenameOutline className="iconoEditarServicio" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* VISTA EDITOR*/}

      <div className="alineacionVertical" style={{ display: `${vistaEditor}` }}>
        <span className="tituloEditandoEdicion"></span>
        <form>
          <div className="alineacionVertical">
            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <MdPayment className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  className="casillaFormulario"
                  placeholder="Estatus pago"
                  value={estatusPago}
                  onChange={(estatusPago) =>
                    setestatusPago(estatusPago.target.value.toUpperCase())
                  }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionHorizontalJustificada">
                <ImPriceTag className="iconoFormulario" />
                <textarea
                  type="text"
                  cols="35"
                  rows="1"
                  className="casillaFormulario"
                  placeholder="N.º sesion"
                  value={estatusServicio}
                  onChange={(estatusServicio) =>
                    setestatusServicio(
                      estatusServicio.target.value.toUpperCase()
                    )
                  }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>
            <div className="divCasillaEstatusServicosDescripcion">
              <span className="tituloObservacionTratamiento">
                OBSERVACIONES DE TRATAMIENTO
              </span>
            </div>
            <div className="divCasillaDescripcionServicio">
              <textarea
                type="text"
                cols="35"
                rows="5"
                className="casillaDescripcionServicio"
                placeholder="Observaciones"
                value={observaciones}
                onChange={(observaciones) =>
                  setobservaciones(observaciones.target.value)
                }
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
    </div>
  );
};

export default EditarCiudades;


