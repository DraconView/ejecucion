import { useContext, useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import CartContext from "../../../../../context/CartContext";
import "../../../../../cssGeneral/CssGeneral.css";

function EditarItemProductos({ criterioBusqueda }) {

    //console.log("criterioBusqueda", criterioBusqueda);

    const { contextCiudades, providerEleccionCiudad } = useContext(CartContext);

    const [contadorLlamadas, setContadorLlamadas] = useState(0)

    const [vistaPublicaciones, setvistaPublicaciones] = useState("flex");
    const [vistaEditor, setvistaEditor] = useState("none");

    const [datos, setdatos] = useState([]);
    const [id, setId] = useState("");
    const [error, setError] = useState(null);

    const [categoryId, setcategoryId] = useState("");
    const [name, setname] = useState("");
    const [descripcion, setdescripcion] = useState("");
    const [relevancia, setrelevancia] = useState();
    const [stock, setstock] = useState();
    const [price, setprice] = useState("");
    const [visibilidad, setvisibilidad] = useState("");

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
        .collection("ItemProductos");
      const querySnapshot = await docRef.get();
      if (querySnapshot.size === 0) {
        //console.log('No existen resultados');
      }
      const cities = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setdatos(cities);
    };*/

    const obtenerRegistrosFirestore = () => {
        const referenciasDb = db.collection("ItemProductos");
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
                setdatos(referenciasSnap);
                //console.log("referenciasSnap", referenciasSnap);
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

        setcategoryId(esteDato.categoryId);
        setname(esteDato.name);
        setdescripcion(esteDato.descripcion);
        setrelevancia(esteDato.relevancia);
        setstock(esteDato.stock);
        setprice(esteDato.price);
        setvisibilidad(esteDato.visibilidad);
    };

    const actualizarRegistrosFirestore = (event) => {
        event.preventDefault();
        db.collection("ItemProductos")
            .doc(id)
            .update({
                categoryId: categoryId,
                name: name,
                descripcion: descripcion,
                relevancia: Number(relevancia),
                stock: Number(stock),
                price: price,
                visibilidad: visibilidad,
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

        setcategoryId("");
        setname("");
        setdescripcion("");
        setrelevancia("");
        setstock("");
        setprice("");
        setvisibilidad("");

        actualizarMarcaDeTiempo();
    };

    const eliminarRegistrosFirestore = (id) => {
        db.collection("ItemProductos")
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

        setcategoryId("");
        setname("");
        setdescripcion("");
        setrelevancia("");
        setstock("");
        setprice("");
        setvisibilidad("");
    };

    /*
    useEffect(() => {
        if (task.img === undefined) {
            //console.log('todavia no hay imagen')
            setLoading(true)
        } else {
            //console.log('ya llego la imagen')
            setImagesArray([task.img]);
        }
    }, [])*/

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
                        {mapeado.img ?
                            <div
                                style={{ margin: "10px 0px 0px 0px" }}
                            >
                                <img
                                    className='imagenEdicionProductos'
                                    src={mapeado.img[0]} />
                            </div>
                            : null}
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "5px 0px 0px 0px" }}
                        >
                            <span>Categoria:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                disabled
                                placeholder="Categoria..."
                                value={mapeado.categoryId}
                                onChange={(e) => setcategoryId(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Nombre:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                disabled
                                placeholder="Nombre..."
                                value={mapeado.name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Relevancia:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                disabled
                                placeholder="Relevancia..."
                                value={mapeado.relevancia}
                                onChange={(e) => setrelevancia(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Stock:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                disabled
                                placeholder="Stock..."
                                value={mapeado.stock}
                                onChange={(e) => setstock(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Precio:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                disabled
                                placeholder="Precio..."
                                value={mapeado.price}
                                onChange={(e) => setprice(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Visibilidad:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                disabled
                                placeholder="Visibilidad..."
                                value={mapeado.visibilidad}
                                onChange={(e) => setvisibilidad(e.target.value)}
                            />
                        </div>
                        <div className="divCasillaEstatusServicosDescripcion">
                            <span className="tituloObservacionTratamiento">
                                Descripcion
                            </span>
                        </div>
                        <div className="divCasillaDescripcionServicio">
                            <textarea
                                type="text"
                                rows="5"
                                className="casillaDescripcionServicio2"
                                placeholder="Descripcion..."
                                value={mapeado.descripcion}
                                onChange={(e) => setdescripcion(e.target.value)}
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
                            className="alineacionHorizontalLeft"
                            style={{ margin: "5px 0px 0px 0px" }}
                        >
                            <span>Categoria:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Categoria..."
                                value={categoryId}
                                onChange={(e) => setcategoryId(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Nombre:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Nombre..."
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Relevancia:</span>
                            <textarea
                                type="number"
                                className="textareaEdicion3"
                                placeholder="Relevancia..."
                                value={relevancia}
                                onChange={(e) => setrelevancia(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Stock:</span>
                            <textarea
                                type="number"
                                className="textareaEdicion3"
                                placeholder="Stock..."
                                value={stock}
                                onChange={(e) => setstock(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Precio:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Precio..."
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                            />
                        </div>
                        <div
                            className="alineacionHorizontalLeft"
                            style={{ margin: "0px 0px 0px 0px" }}
                        >
                            <span>Visibilidad:</span>
                            <textarea
                                type="text"
                                className="textareaEdicion3"
                                placeholder="Visibilidad..."
                                value={visibilidad}
                                onChange={(e) => setvisibilidad(e.target.value)}
                            />
                        </div>

                        <div className="divCasillaEstatusServicosDescripcion">
                            <span className="tituloObservacionTratamiento">
                                Descripcion
                            </span>
                        </div>
                        <div className="divCasillaDescripcionServicio">
                            <textarea
                                type="text"
                                rows="5"
                                className="casillaDescripcionServicio2"
                                placeholder="Descripcion..."
                                value={descripcion}
                                onChange={(e) => setdescripcion(e.target.value)}
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
