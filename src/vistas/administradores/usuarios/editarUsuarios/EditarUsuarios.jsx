import { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import CartContext from "../../../../context/CartContext";
import "../../../../cssGeneral/CssGeneral.css";

import { FaCity } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BsPhoneFill, BsFillTelephoneFill } from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";

function EditarItemProductos({ criterioBusqueda, tipoDeCampo }) {

    const { contextCiudades, providerEleccionCiudad } = useContext(CartContext);

    const [contadorLlamadas, setContadorLlamadas] = useState(0)

    const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
    const [vistaEditor, setvistaEditor] = useState("none");

    const [datosObtenidos, setdatosObtenidos] = useState([]);
    const [id, setId] = useState("");
    const [error, setError] = useState(null);

    const [nombreMasApellido, setnombreMasApellido] = useState("");
    const [celularMovil, setcelularMovil] = useState("");
    const [ciudad, setciudad] = useState("");
    const [email, setemail] = useState("");
    const [observacionesDeCuidado, setobservacionesDeCuidado] = useState("");

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

    /*const obtenerRegistrosFirestore = async () => {
      let docRef;
      docRef = db
        .collection("RegistroClientes");
      const querySnapshot = await docRef.get();
      if (querySnapshot.size === 0) {
        //console.log('No existen resultados');
      }
      const cities = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setdatosObtenidos(cities);
    };*/

    const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("RegistroClientes");
        referenciasDb
            .where(tipoDeCampo, "==", `${criterioBusqueda}`)
            .get()
            .then((querySnapshot) => {
                const referenciasSnap = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setdatosObtenidos(referenciasSnap);
            })
            .catch((error) => {
                //console.error("Error al obtener los productos:", error);
            });
    };

    useEffect(() => {
        if (criterioBusqueda.length > 0) {
            obtenerRegistrosFirestore();
        }
    }, [criterioBusqueda]);


    /*useEffect(() => {
        if (contadorLlamadas === 0) {
            obtenerRegistrosFirestore();
            setContadorLlamadas(contadorLlamadas + 1)
            //console.log("se llamo obtenerRegistrosFirestore desde useEffect")
        }
    }, []);*/

    const editarRegistros = (esteDato) => {
        setId(esteDato.id);
        setvistaPublicaciones("none");
        setvistaEditor("flex");

        setnombreMasApellido(esteDato.nombreMasApellido);
        setcelularMovil(esteDato.celularMovil);
        setobservacionesDeCuidado(esteDato.observacionesDeCuidado);
        setciudad(esteDato.ciudad);
        setemail(esteDato.email);
    };

    const actualizarRegistrosFirestore = (event) => {
        event.preventDefault();
        db.collection("RegistroClientes")
            .doc(id)
            .update({
                nombreMasApellido: nombreMasApellido,
                celularMovil: celularMovil,
                observacionesDeCuidado: observacionesDeCuidado,
                ciudad: ciudad,
                email: email,
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

        setnombreMasApellido("");
        setcelularMovil("");
        setobservacionesDeCuidado("");
        setciudad("");
        setemail("");

        //actualizarMarcaDeTiempo();
    };

    const eliminarRegistrosFirestore = (id) => {
        db.collection("RegistroClientes")
            .doc(id)
            .delete()
            .then(() => {
                obtenerRegistrosFirestore();
            })
            .catch((error) => {
                //console.error("Error al eliminar el documento:", error);
            });
        //actualizarMarcaDeTiempo();
    };

    const volverEdicion = () => {
        setvistaPublicaciones("flex");
        setvistaEditor("none");

        setnombreMasApellido("");
        setcelularMovil("");
        setobservacionesDeCuidado("");
        setciudad("");
        setemail("");
    };

    /*
    useEffect(() => {
        if (mapeado.img === undefined) {
            //console.log('todavia no hay imagen')
            setLoading(true)
        } else {
            //console.log('ya llego la imagen')
            setImagesArray([mapeado.img]);
        }
    }, [])*/

    const obtenerTodosLosRegistrosFirestore = () => {
        const referenciasDb = db.collection("RegistroClientes");
        referenciasDb
            .get()
            .then((querySnapshot) => {
                const referenciasSnap = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });
                setdatosObtenidos(referenciasSnap);
            })
            .catch((error) => {
                //console.error("Error al obtener los productos:", error);
            });
    };

    return (
        <div className="alineacionVertical">
            <div
                className="estiloListaEdicion"
                style={{ display: `${vistaPublicaciones}` }}
            >
                {datosObtenidos.length === 0 ? (
                    <div
                        className="cargandoEdicionesProductos"
                        style={{ cursor: "pointer" }}
                        onClick={() => obtenerTodosLosRegistrosFirestore()}
                    >
                        <div className="textoCargandoEdicionesProductos">
                            para obtener todos los productos presiona
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
                    <div className="divPrincipalItemDetail">
                        {datosObtenidos.map((mapeado, index) => (
                            <div
                                key={mapeado.id}
                                className="Container"
                                style={{ margin: "20px 20px 20px 20px" }}
                            >
                                <div className="divIconoCliente">
                                    <BsFillPersonFill size={55} color="#ffffff" />
                                </div>
                                <span className="textoNombreCliente">
                                    {mapeado.nombreMasApellido}
                                </span>
                                <div className="InfoContainer">
                                    <div
                                        className="casillaEstatusServicos"
                                        style={{ margin: "0px 0px 2px 0px" }}
                                    >
                                        <BsPhoneFill className="iconoFormulario2" />
                                        <textarea
                                            type="text"
                                            className="textareaEdicion2"
                                            disabled
                                            placeholder="Celular..."
                                            value={mapeado.celularMovil}
                                            onChange={(e) => setcelularMovil(e.target.value)}
                                        />
                                    </div>
                                    <div
                                        className="casillaEstatusServicos"
                                        style={{ margin: "0px 0px 2px 0px" }}
                                    >
                                        <FaCity className="iconoFormulario2" />
                                        <textarea
                                            type="text"
                                            className="textareaEdicion2"
                                            disabled
                                            placeholder="Ingrese la ciudad..."
                                            value={mapeado.ciudad}
                                            onChange={(e) => setciudad(e.target.value)}
                                        />
                                    </div>
                                    <div
                                        className="casillaEstatusServicos"
                                        style={{ margin: "0px 0px 2px 0px" }}
                                    >
                                        <AiOutlineMail className="iconoFormulario2" />
                                        <textarea
                                            type="text"
                                            className="textareaEdicion2"
                                            disabled
                                            placeholder="Ingrese el email..."
                                            value={mapeado.email}
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>
                                    <div className="divCasillaEstatusServicosDescripcion">
                                        <span className="tituloObservacionTratamiento">
                                            OBSERVACIONES DE CUIDADO
                                        </span>
                                    </div>
                                    <div className="divCasillaDescripcionServicio">
                                        <textarea
                                            type="text"
                                            rows="5"
                                            disabled
                                            className="casillaDescripcionServicio"
                                            placeholder="Observaciones de cuidado"
                                            value={mapeado.observacionesDeCuidado}
                                        />
                                    </div>
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
                )}


            </div>

            {/* - - - - - - - - - VISTA EDITOR - - - - - - - - - */}

            <div
                className="divPublicacionesEdicion"
                style={{ display: `${vistaEditor}` }}
            >
                <form>
                    <div className="alineacionVertical">
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "5px 0px 0px 0px" }}
                        >
                            <span>Nombre:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Nombre..."
                                value={nombreMasApellido}
                                onChange={(e) => setnombreMasApellido(e.target.value.toLowerCase())}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Celular:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Celular..."
                                value={celularMovil}
                                onChange={(e) => setcelularMovil(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Ciudad:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Ciudad..."
                                value={ciudad}
                                onChange={(e) => setciudad(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Email:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Email..."
                                value={email}
                                onChange={(e) => setemail(e.target.value.toLowerCase())}
                            />
                        </div>

                        <div className="divCasillaEstatusServicosDescripcion">
                            <span className="tituloObservacionTratamiento">
                                observaciones de cuidado
                            </span>
                        </div>
                        <div className="divCasillaDescripcionServicio">
                            <textarea
                                type="text"
                                rows="5"
                                className="casillaDescripcionServicio2"
                                placeholder="observaciones de cuidado"
                                value={observacionesDeCuidado}
                                onChange={(e) => setobservacionesDeCuidado(e.target.value)}
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
}

export default EditarItemProductos;
