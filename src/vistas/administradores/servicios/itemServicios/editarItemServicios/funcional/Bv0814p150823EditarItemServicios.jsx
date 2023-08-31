import { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../../../helpers/AccionesbdFire";
import "./../../../../../cssGeneral/CssGeneral.css";
import { db, auth, storage } from "../../../../../firebase";
import { AiOutlineCaretUp } from "react-icons/ai";
import { BsCalendarDate, BsGraphUp, BsEye } from "react-icons/bs";
import { MdPayment, MdDriveFileRenameOutline } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import { BsFileBarGraph } from "react-icons/bs";

const ejemploServicios = [
  {
      "id": "06HdukaxhmcN8qcVymuE",
      "descripcion": "Mentón - Precio por sesión",
      "stock": 99993,
      "img": [
          "https://draconsoftware.com/storage/files/ndn6g6vrgWm7luN4MIsh5zDH7Um2FM1yV5B0UNpC.jpg"
      ],
      "name": "MENTÓN",
      "zonaDepilacion": "Mentón - Precio por sesión",
      "visibilidad": "ACTIVO",
      "duracionCita": 30,
      "relevancia": 0,
      "price": "600",
      "categoryId": "SERVICIOS",
      "indiceJerarquia": 7,
      "timestamp": {
          "seconds": 1682623333,
          "nanoseconds": 702000000
      }
  },
  {
      "id": "2Vvi98YQz9CiGwKOvFYh",
      "visibilidad": "ACTIVO",
      "price": "1950",
      "relevancia": null,
      "name": "MEDIAS PIERNAS",
      "indiceJerarquia": 292,
      "zonaDepilacion": "Precio por sesión - Medias piernas",
      "timestamp": {
          "seconds": 1682609778,
          "nanoseconds": 860000000
      },
      "duracionCita": 30,
      "descripcion": "Precio por cada sesión, Medias Piernas",
      "img": [
          "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
      ],
      "categoryId": "SERVICIOS",
      "stock": 99708
  },
  {
      "id": "4BunDNo8bMUGGRSUOmw7",
      "relevancia": "6",
      "indiceJerarquia": 0,
      "name": "PROMO 6",
      "duracionCita": 30,
      "price": "9360",
      "timestamp": {
          "seconds": 1682597159,
          "nanoseconds": 969000000
      },
      "img": [
          "https://draconsoftware.com/storage/files/C14TKLjU6aVKBOxKHcRJXov4Fo4P8KJGKEVjwTlo.jpg"
      ],
      "categoryId": "PROMOCIONES",
      "stock": 100000,
      "visibilidad": "ACTIVO",
      "descripcion": "Con el pack de 6! sesiones eliminas definitivamente el vello en toda la zona íntima. Promo Cavado completo.\n---\nPagas las 6 sesiones en efectivo o con cualquier tarjeta de crédito y tienes un 20% de descuento\nPrecio total: $ 9.360 que lo puedes pagar con tu tarjeta de crédito hasta en 12 cuotas de $ 780 😉",
      "zonaDepilacion": "Cavado total (pack 6 sesiones)"
  },
  {
      "id": "4ks4oe4YVOl0kTlsc5bM",
      "categoryId": "ZONASPEQUEÑAS",
      "timestamp": {
          "seconds": 1688509994,
          "nanoseconds": 405000000
      },
      "relevancia": null,
      "visibilidad": "ACTIVO",
      "name": "ZONAS PEQUEÑAS",
      "price": "600",
      "stock": 100000,
      "img": [
          "https://draconsoftware.com/storage/files/5UhttiLOKNTCNub0hv9ecliSDEaDGdGD1vofDpnt.jpg"
      ],
      "zonaDepilacion": "Zonas Pequeñas",
      "descripcion": "",
      "indiceJerarquia": 0
  },
  {
      "id": "6xZNAVmUyATMUgNq0j1x",
      "duracionCita": 30,
      "categoryId": "SERVICIOS",
      "price": "600",
      "indiceJerarquia": 0,
      "visibilidad": "ACTIVO",
      "timestamp": {
          "seconds": 1682623285,
          "nanoseconds": 298000000
      },
      "relevancia": 0,
      "img": [
          "https://draconsoftware.com/storage/files/ykVtLWlyh6w52S139sA9RIPz4nUaBxbknPTTlowr.jpg"
      ],
      "name": "BOZO",
      "stock": 100000,
      "descripcion": "Bozo - Precio por sesión",
      "zonaDepilacion": "Bozo - Precio por sesión"
  },
  {
      "id": "B3WekI98RSPidCbVVvOT",
      "name": "AXILAS",
      "img": [
          "https://draconsoftware.com/storage/files/lqzbJYa2cNmBgvJUg29xVY4e8W58E137rhZksQIc.png"
      ],
      "indiceJerarquia": 0,
      "relevancia": 1,
      "stock": 100000,
      "categoryId": "SERVICIOS",
      "price": "900",
      "zonaDepilacion": "AXILAS",
      "descripcion": "Estás buscando que tus axilas se vean perfectas? En SkinLáser sabemos como hacer para que la mejor tecnología te brinde los resultados rápidos y efectivos que esperas!. Sabes porqué nos prefieren?",
      "visibilidad": "ACTIVO",
      "duracionCita": 30,
      "timestamp": {
          "seconds": 1682385391,
          "nanoseconds": 757000000
      }
  },
  {
      "id": "KDN0iLOsByXfyOuS9DJB",
      "visibilidad": "ACTIVO",
      "timestamp": {
          "seconds": 1682601779,
          "nanoseconds": 70000000
      },
      "stock": 100000,
      "duracionCita": 30,
      "zonaDepilacion": "Todo el cuerpo!",
      "descripcion": "Conoces el significado de la palabra Libertad? \nElimina definitivamente el vello en todo tu cuerpo con nuestra promo pack de 6! sesiones para Cuerpo entero\n----------\nPagas las 6 sesiones en efectivo o con cualquier tarjeta de crédito y tienes un 20% de descuento\nPrecio total $ 34.080 que lo puedes pagar con tu tarjeta de crédito hasta en 12 cuotas de $ 2.840 😉",
      "categoryId": "PROMOCIONES",
      "name": "PROMO 7",
      "indiceJerarquia": 0,
      "img": [
          "https://draconsoftware.com/storage/files/DrFsneCkTYLTernF2pK2RLY1rgFWF6g3sdkCP4GP.jpg"
      ],
      "price": "34080",
      "relevancia": "7"
  },
  {
      "id": "KqjAo9bqa23wM2UOTyGf",
      "stock": 100000,
      "relevancia": 3,
      "categoryId": "SERVICIOS",
      "descripcion": "Estás buscando sentirte realmente libre? Con el cavado completo eliminas definitivamente los vellos en toda la zona íntima incluye línea interglutea (tira de cola)En SkinLáser sabemos como hacer para que la mejor tecnología te brinde los resultados rápidos y efectivos que esperas!. Sabes porqué nos prefieren?",
      "duracionCita": 30,
      "indiceJerarquia": 0,
      "img": [
          "https://draconsoftware.com/storage/files/1RmzyQja2anArH1Hp43HeRYGnxaiceguFCP3mAtE.png"
      ],
      "visibilidad": "ACTIVO",
      "price": "1950",
      "zonaDepilacion": "CAVADO COMPLETO",
      "name": "CAVADO COMPLETO",
      "timestamp": {
          "seconds": 1682385788,
          "nanoseconds": 263000000
      }
  },
  {
      "id": "La8v83RxGpm8XlWMjmXi",
      "timestamp": {
          "seconds": 1682609603,
          "nanoseconds": 873000000
      },
      "duracionCita": 30,
      "name": "PIERNAS COMPLETAS",
      "stock": 99982,
      "img": [
          "https://draconsoftware.com/storage/files/Osjad4mAfA4SH762vPddp60o2b1yYN2obeuCyrm8.jpg"
      ],
      "indiceJerarquia": 18,
      "relevancia": null,
      "price": "2900",
      "categoryId": "PROMOCIONES",
      "descripcion": "Piernas completas, precio por sesión",
      "visibilidad": "ACTIVO",
      "zonaDepilacion": "Precio por sesión - Piernas"
  },
  {
      "id": "Lcv7lXKbx9ZL73Wof9CV",
      "stock": 100000,
      "indiceJerarquia": 0,
      "visibilidad": "ACTIVO",
      "name": "CUERPO ENTERO",
      "zonaDepilacion": "CUERPO ENTERO",
      "descripcion": "La inversión que te ofrece los mejores beneficios, elimina definitivamente el vello en todo tu cuerpo! Has pensado cuánto cambia tu vida sin tener que depilarte?En SkinLáser sabemos como hacer para que la mejor tecnología te brinde los resultados rápidos y efectivos que esperas!. Sabes porqué nos prefieren?",
      "duracionCita": 60,
      "img": [
          "https://draconsoftware.com/storage/files/CUW9VpS0MHKz8i0Xcr1kuhD0IGZZHJd7uAvNkYlK.png"
      ],
      "categoryId": "SERVICIOS",
      "relevancia": 2,
      "price": "7100",
      "timestamp": {
          "seconds": 1682385559,
          "nanoseconds": 31000000
      }
  },
  {
      "id": "R6A83ABWEmckpEkYUQ1f",
      "price": "1750",
      "descripcion": "Precio por cada sesión - Rostro completo",
      "timestamp": {
          "seconds": 1682609853,
          "nanoseconds": 349000000
      },
      "zonaDepilacion": "Todo rostro - Precio por sesión",
      "relevancia": 0,
      "name": "ROSTRO COMPLETO",
      "img": [
          "https://draconsoftware.com/storage/files/2MMPk2fiISWgKHIMepSaeOqKenAcMpbCbxavkGpP.jpg"
      ],
      "visibilidad": "ACTIVO",
      "indiceJerarquia": 0,
      "categoryId": "SERVICIOS",
      "stock": 100000,
      "duracionCita": 30
  },
  {
      "id": "Ux0LiYBzgzIzZuSOwrFk",
      "visibilidad": "ACTIVO",
      "zonaDepilacion": "Bozo y Mentón - Precio por sesión",
      "descripcion": "Bozo y Mentón - Precio por sesión",
      "relevancia": 0,
      "name": "BOZO Y MENTÓN",
      "timestamp": {
          "seconds": 1682623386,
          "nanoseconds": 766000000
      },
      "indiceJerarquia": 0,
      "img": [
          "https://draconsoftware.com/storage/files/Q9C2rpd28oFaEl06Lj2Ls2o8BHVgheQcsMwWEAKd.jpg"
      ],
      "categoryId": "SERVICIOS",
      "duracionCita": 30,
      "price": "1000",
      "stock": 100000
  },
  {
      "id": "W8kMRJ4y766dfMI4liUh",
      "relevancia": 3,
      "zonaDepilacion": "Promo 2 amigas (pack 6 sesiones)",
      "img": [
          "https://draconsoftware.com/storage/files/ITc515QBQ60pN7jFKCQHiKnbQDlJwt5ZzjzQZr75.jpg"
      ],
      "stock": 100000,
      "indiceJerarquia": 0,
      "categoryId": "PROMOCIONES",
      "timestamp": {
          "seconds": 1682552720,
          "nanoseconds": 418000000
      },
      "visibilidad": "ACTIVO",
      "duracionCita": 30,
      "name": "PROMO 3",
      "price": "9360",
      "descripcion": "Vienen 2 amigas, contratan cavado completo y les regalamos las axilas! Además si pagan las 6 sesiones tienen un 20% de descuento (con cualquier tarjeta de crédito)"
  },
  {
      "id": "cdpazbg2cHHfemFkLkJ7",
      "categoryId": "PROMOCIONES",
      "duracionCita": 30,
      "stock": 100000,
      "zonaDepilacion": "PROMO AMIGAS (POR SESIÓN) PRECIO POR CADA UNA",
      "relevancia": "2",
      "name": "PROMO 2",
      "price": "1950",
      "visibilidad": "ACTIVO",
      "timestamp": {
          "seconds": 1682553928,
          "nanoseconds": 720000000
      },
      "img": [
          "https://draconsoftware.com/storage/files/gR98VUXgr0TRvBIsOjILKEMirjJupi3NYSLFA1Zv.jpg"
      ],
      "descripcion": "Las buenas noticias tenemos que compartirlas! invita a una amiga y se benefician ambas!\nCon esta promo vienen 2 amigas, se hacen Cavado completo y les regalamos las Axilas.\n---\nPaga cada una $ 1.950 cada sesión",
      "indiceJerarquia": 0
  },
  {
      "id": "fSzkI4vcowjWqBrbfDfE",
      "timestamp": {
          "seconds": 1682597066,
          "nanoseconds": 569000000
      },
      "duracionCita": 30,
      "indiceJerarquia": 0,
      "stock": 100000,
      "zonaDepilacion": "Piernas + Cavado + Axilas ",
      "visibilidad": "ACTIVO",
      "name": "PROMO 5",
      "img": [
          "https://draconsoftware.com/storage/files/Lw0cmVWseGxf6ZQSZ8OxDByDqZ5XBVzdwd3thZhH.jpg"
      ],
      "categoryId": "PROMOCIONES",
      "descripcion": "maginas tus piernas perfectas y la comodidad de toda tu zona íntima sin vellos. \nPack de 6! sesiones para Piernas enteras + Cavado completo y Axilas de regalo\n---\nPagas las 6 sesiones en efectivo o con cualquier tarjeta de crédito y tienes un 20% de descuento\nPrecio total $ 23.280 y con tarjeta de crédito puedes pagar hasta en 12 cuotas de $ 1.940 😉",
      "price": "23280",
      "relevancia": "5"
  },
  {
      "id": "vvUoPANQvbGCeSqGB00z",
      "indiceJerarquia": 0,
      "name": "PROMO 4",
      "categoryId": "PROMOCIONES",
      "img": [
          "https://draconsoftware.com/storage/files/x8PAs0HEpdihBNPh8yWJAXyTY3SP0EHMGSYLVYfG.jpg"
      ],
      "price": "8400",
      "descripcion": "Cuanto cambia tu vida si eliminas definitivamente el vello de tu rostro? \nPack de 6! sesiones para  Rostro completo.\n---\nPagas las 6 sesiones efectivo o con cualquier tarjeta de crédito tienes un 20% de descuento\nPrecio total: $ 8.400 o con tarjeta de crédito puedes pagar hasta en 12 cuotas de $ 700 😉",
      "duracionCita": 30,
      "zonaDepilacion": "Rostro completo (pack por 6 sesiones)",
      "timestamp": {
          "seconds": 1682554143,
          "nanoseconds": 614000000
      },
      "visibilidad": "ACTIVO",
      "stock": 100000,
      "relevancia": "4"
  },
  {
      "id": "wk9uZ5GI2WKuQ5GzTqTw",
      "relevancia": "1",
      "visibilidad": "ACTIVO",
      "timestamp": {
          "seconds": 1682387118,
          "nanoseconds": 34000000
      },
      "img": [
          "https://draconsoftware.com/storage/files/uhOHPgJSPvEbAkmuTNcG5zbcXaEm8I7ZHxmhjKnE.png"
      ],
      "name": "PROMO 1",
      "zonaDepilacion": "Piernas enteras + Cavado completo",
      "stock": 100000,
      "descripcion": "Paso a paso, has imaginado tus piernas perfectas y la zona íntima sin vellos? Paga por sesión!\nCon esta promo tienes Piernas enteras + Cavado completo y te regalamos Axilas!\n---\nPagas por cada sesión $ 4.850",
      "price": "4850",
      "categoryId": "PROMOCIONES",
      "duracionCita": 30,
      "indiceJerarquia": 0
  },
  {
      "id": "ytqB6hDgGUhvIAPKxJtN",
      "zonaDepilacion": "Espalda - Precio por sesión",
      "img": [
          "https://draconsoftware.com/storage/files/956191n2f52mi0PbZHmUPhqH7UkwC9ydf7DFuRcn.jpg"
      ],
      "price": "1950",
      "relevancia": 0,
      "name": "ESPALDA",
      "stock": 100000,
      "timestamp": {
          "seconds": 1682623476,
          "nanoseconds": 777000000
      },
      "descripcion": "Espalda - Precio por sesión",
      "categoryId": "SERVICIOS",
      "visibilidad": "ACTIVO",
      "indiceJerarquia": 0,
      "duracionCita": 30
  }
]

const EditarItemServicios = ({ criterioBusqueda }) => {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  const [busquedaProductos, setbusquedaProductos] = useState([]);

  const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
  const [vistaEditor, setvistaEditor] = useState("none");

  const [task, setTask] = useState("");
  const [bdProductos, setbdProductos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  // categoryId descripcion name price relevancia visibilidad zonaDepilacion
  const [categoryId, setcategoryId] = useState("");
  const [price, setprice] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [name, setname] = useState("");
  const [relevancia, setrelevancia] = useState("");
  const [visibilidad, setvisibilidad] = useState("");
  const [zonaDepilacion, setzonaDepilacion] = useState("");
  const [tendencia, settendencia] = useState("");

  useEffect(() => {// consulta a la base de datos
    if (criterioBusqueda.length > 0) {
      obtenerRegistrosFirestore();
    }
  }, [criterioBusqueda, busquedaProductos]);

  const obtenerRegistrosFirestore = () => {
    const referenciasDb = db.collection("ItemServicios");
    referenciasDb
      //.where("name", "==", `${criterioBusqueda}`) // BUSQUEDA EXACTA
      .where("name", ">=", `${criterioBusqueda}`) // BUSQUEDA QUE CONTENGAN
      .where("name", "<", `${criterioBusqueda}z`) // BUSQUEDA QUE CONTENGAN
      // .orderBy("timestamp", "asc") cambia a desc
      //.orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        const referenciasSnap = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setbusquedaProductos(referenciasSnap);
      })
      .catch((error) => {
        //console.error("Error al obtener los productos:", error);
      });
  };

  const obtenerTodosLosRegistrosFirestore = () => {
    const referenciasDb = db.collection("ItemServicios");
    referenciasDb
      .get()
      .then((querySnapshot) => {
        const referenciasSnap = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setbusquedaProductos(referenciasSnap);
        //console.log("referenciasSnap", referenciasSnap);
      })
      .catch((error) => {
        //console.error("Error al obtener los productos:", error);
      });
  };

  const actualizarRegistrosFirestore = (event) => {
    event.preventDefault();
    db.collection("ItemServicios").doc(id).update({
      categoryId: categoryId,
      price: price,
      descripcion: descripcion,
      name: name,
      relevancia: relevancia,
      visibilidad: visibilidad,
      zonaDepilacion: zonaDepilacion,
    });
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    obtenerRegistrosFirestore();
  };

  const validForm = () => {
    let isValid = true;
    setError(null);

    if (isEmpty(name)) {
      setError("Debes ingresar una publicacion.");
      isValid = false;
    }

    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await addDocument("ItemServicios", { name: name }); //> adicionando publicacion a la coleccion de bdProductos
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    setbdProductos([...bdProductos, { id: result.data.id, name: task }]); //> se llama a base de datos y se almacena en memoria
    setname("");
  };

  const saveTask = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    const result = await updateDocument("ItemServicios", id, {
      descripcion: descripcion,
      categoryId: categoryId,
      price: price,
      name: name,
      relevancia: relevancia,
      visibilidad: visibilidad,
      zonaDepilacion: zonaDepilacion,
    });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }

    const editedTasks = bdProductos.map((item) =>
      item.id === id
        ? {
          id,
          categoryId: categoryId,
          price: price,
          descripcion: descripcion,
          name: name,
          relevancia: relevancia,
          visibilidad: visibilidad,
          zonaDepilacion: zonaDepilacion,
        }
        : item
    );
    setbdProductos(editedTasks);
    setEditMode(false);
    setId("");
    setvistaPublicaciones("flex");
    setvistaEditor("none");
  };

  const deleteTask = async (id) => {
    alert("¿Estas seguro de eliminar esta publicacion?");
    const result = await deleteDocument("ItemServicios", id);
    if (!result.statusResponse) {
      setError(result.error); //
      return;
    }

    const filteredTasks = bdProductos.filter((task) => task.id !== id);
    setbdProductos(filteredTasks);
  };

  const editTask = (theTask) => {
    setvistaPublicaciones("none");
    setvistaEditor("flex");
    setId(theTask.id);
    setEditMode(true);

    setcategoryId(theTask.categoryId);
    setprice(theTask.price);
    setdescripcion(theTask.descripcion);
    setname(theTask.name);
    setrelevancia(theTask.relevancia);
    setvisibilidad(theTask.visibilidad);
    setzonaDepilacion(theTask.zonaDepilacion);
  };

  const volverEdicion = () => {
    setvistaPublicaciones("flex");
    setvistaEditor("none");
    setdescripcion("");
    setname("");
    setcategoryId("");
    setprice("");
    setrelevancia("");
    setvisibilidad("");
    setzonaDepilacion("");
    setId("");
  };

  return (
    <div className="contenedorAccionesFiltroClientes">
      <div
        className="divPublicacionesEdicion"
        style={{ display: `${vistaPublicaciones}` }}
      >
        {size(busquedaProductos) === 0 ? (
          <div
            className="cargandoEdicionesProductos"
            style={{ cursor: "pointer" }}
            onClick={() => obtenerTodosLosRegistrosFirestore()}
          >
            <div className="textoCargandoEdicionesProductos">
              para obtener todos los servicios presiona
              <span
                style={{
                  color: "orange",
                  fontWeight: "bold",
                }}>
                {" "}aqui
              </span>
            </div>
          </div>
        ) : (
          <div className="alineacionVertical">
            <div style={{ marginTop: "30px" }} />
            <div className="estiloListaEdicion">
              {busquedaProductos.map((task) => (
                <div className="divFichaServicioCliente" key={task.id}>
                  <div className="divTotalDatos">
                    <div className="divArrowDropUpPrecio">
                      <div className="divTotalVentaServicio">
                        <AiOutlineCaretUp className="arrowDropUpIcon" />
                        <span className="textoTotalVentaMonto">
                          {task.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="divEstatus" style={{ margin: '10px 0px 5px 0px' }}>
                    <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
                      <BsEye className="iconosServicios" />
                      <span className="textoEstatusPago">
                        visibilidad:
                        {" "}{task.visibilidad}
                      </span>
                    </div>
                    <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
                      <BsFileBarGraph className="iconosServicios" />
                      <span className="textoEstatusPago">
                        indiceJerarquia:
                        <span style={{ color: "orange" }}>
                        {" "}{task.indiceJerarquia}
                        </span>
                      </span>
                    </div>
                    <div className="casillaEstatusServicos" style={{ margin: "7px 0px 7px 0px" }}>
                      <BsGraphUp className="iconosServicios" />
                      <span className="textoEstatusPago">
                        tendencia:
                        <span style={{ color: "orange" }}>
                        {" "}{task.indiceJerarquia}
                        </span>
                      </span>
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

      <div
        className="alineacionVertical"
        style={{ display: `${vistaEditor}` }}
      >
        <span className="tituloEditandoEdicion">
          {editMode ? "Modificar estado" : "Agregar publicacion"}
        </span>
        <form onSubmit={editMode ? saveTask : addTask}>
          {error && <span className="no">{error}</span>}
          <div className="alineacionVertical">
            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionCasillaEdicionFormularios">
                <span className="casillaFormularioTres" >CATEGORYID:</span>
                <textarea
                  resize="none"
                  type="text"
                  className="casillaFormularioDos"
                  placeholder="Categoria id"
                  value={categoryId}
                  onChange={(e) =>
                    setcategoryId(e.target.value.toUpperCase())
                  }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionCasillaEdicionFormularios">
                <span className="casillaFormularioTres" >PRECIO:</span>
                <textarea
                  type="text"
                  className="casillaFormularioDos"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionCasillaEdicionFormularios">
                <span className="casillaFormularioTres" >NOMBRE:</span>
                <textarea
                  type="text"
                  className="casillaFormularioDos"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setname(e.target.value.toUpperCase())}
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionCasillaEdicionFormularios">
                <span className="casillaFormularioTres" >RELEVANCIA:</span>
                <textarea
                  type="text"
                  className="casillaFormularioDos"
                  placeholder="Relenvancia"
                  value={relevancia}
                  onChange={(e) =>
                    setrelevancia(
                      e.target.value.toUpperCase()
                    )
                  }
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionCasillaEdicionFormularios">
                <span className="casillaFormularioTres" >VISIBILIDAD:</span>
                <textarea
                  type="text"
                  className="casillaFormularioDos"
                  placeholder="Visibilidad"
                  value={visibilidad}
                  onChange={(e) => setvisibilidad(e.target.value.toUpperCase())}
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="marginEdicionFiltroServiciosClientes">
              <div className="alineacionCasillaEdicionFormularios">
                <span className="casillaFormularioTres" >ZONA:</span>
                <textarea
                  type="text"
                  className="casillaFormularioDos"
                  placeholder="Zona de pilacion"
                  value={zonaDepilacion}
                  onChange={(e) => setzonaDepilacion(e.target.value.toUpperCase())}
                />
              </div>
              <div className="divDividerFormulario" />
            </div>

            <div className="divCasillaEstatusServicosDescripcion">
              <span className="tituloObservacionTratamiento">
                DESCRIPCION DEL SERVICIO
              </span>
            </div>
            <div className="divCasillaDescripcionServicio">
              <textarea
                type="text"
                cols="35"
                rows="5"

                className="casillaDescripcionServicio"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) =>
                  setdescripcion(e.target.value)
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

export default EditarItemServicios;
