import { useState } from "react";
import { db, auth, storage } from "./../../../../../firebase/index";
import "./../../../../../cssGeneral/CssGeneral.css";
import axios from "axios";
import { resizeImage } from "../../../../../helpers/resizeImage";
import Cropper from "react-cropper";
import "react-cropper/dist/cropper.css";
import { Button, Modal, makeStyles } from "@material-ui/core";

import { BsCloudArrowUp } from "react-icons/bs";
import { MdOutlineAddAPhoto } from "react-icons/md";

const API_URL = 'https://draconsoftware.com/api';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

// function CrearCategorias({ username }) { PARA SOLICITAR USER
function CrearCategoriasSevicios() {
    //console.log('llamando a CrearCategoriasSevicios');
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [cropData, setCropData] = useState([]);
    const [cropper, setCropper] = useState();

    const [categoryId, setcategoryId] = useState("");
    const [name, setname] = useState("");
    const [relevancia, setrelevancia] = useState();
    const [subCategorias, setsubCategorias] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setOpen(true);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = async () => {
        if (typeof cropper !== "undefined") {
            const dataURI = cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.7);
            const blob = await resizeImage(dataURI);
            let myImages = [...cropData];
            myImages.push({
                image: blob,
                url: URL.createObjectURL(blob),
            });
            setCropData(myImages);
            setOpen(false);
        }
    };

    const handleSubmit = async () => {
        if (cropData.length) {
            let urlImages = [];
            for (let index = 0; index < cropData.length; index++) {
                const element = cropData[index];
                const file = element.image;
                const data = {
                    file: file,
                };
                try {
                    const res = await axios.post(
                        `${API_URL}/api/upload`,
                        data,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                            onUploadProgress: (progressEvent) => {
                                const newProgress = Math.round(
                                    (progressEvent.loaded / progressEvent.total) * 100
                                );
                                setProgress(newProgress);
                            },
                        }
                    );
                    if (res.status === 200) {
                        urlImages.push(res.data.url_full);
                    }
                } catch (error) {
                    //console.log(error);
                }
            }
            //db.collection(`${eleccionBd}`).add({
            try {
                db.collection("BdCategoriasServicios").add({
                    timestamp: new Date(),
                    categoryId: categoryId,
                    img: urlImages,
                    //username: username,
                    name: categoryId,
                    relevancia: Number(relevancia),
                    visibilidad: "ACTIVO",
                    subCategorias: subCategorias,
                    indiceJerarquia: 0,
                });
                setProgress(0);
                setname("");
                setcategoryId("");
                setrelevancia("");
                setImage(null);
                setCropData([]);
                setsubCategorias("");
            } catch (error) {
                //console.log(error);
            }
        } else {
            alert("Debe subir una imagen");
        }
    };

    const handleDelete = (index) => {
        const myImages = [...cropData];
        myImages.splice(index, 1);
        setCropData(myImages);
    };

    return (
        <div className="alineacionVertical">
            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                    {image && (
                        <div className="alineacionVertical">
                            <div className="containerCrop">
                                <Cropper
                                    style={{ height: 300, width: "100%" }}
                                    zoomTo={0.5}
                                    scalable={true}
                                    zoomable={false}
                                    initialAspectRatio={1 / 1}
                                    src={image}
                                    viewMode={1}
                                    minCropBoxHeight={10}
                                    minCropBoxWidth={10}
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                    checkOrientation={false}
                                    onInitialized={(instance) => {
                                        setCropper(instance);
                                    }}
                                    guides={true}
                                    aspectRatio={1 / 1}
                                />
                            </div>
                            <div className="buttons">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={getCropData}
                                >
                                    Cortar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
            <div className="alineacionHorizontalWrap">
                <div className="alineacionVertical">
                    <div className="divBarraTitulos">
                        <span className="textoBarraTitulos">crear categoría</span>
                    </div>

                    <textarea
                        type="text"
                        cols="35"
                        rows="1"
                        placeholder=" Ingrese la categoría"
                        className="camposText"
                        style={{margin:'50px 0px 15px 0px'}}
                        onChange={(event) =>
                            setcategoryId(event.target.value.replace(" ", "").toUpperCase())
                        }
                        value={categoryId.toUpperCase()}
                    />
                    <textarea
                        type="text"
                        cols="35"
                        rows="1"
                        placeholder=" Ingrese la relevancia"
                        className="camposText"
                        style={{margin:'10px 0px 15px 0px'}}
                        onChange={(event) =>
                            setrelevancia(event.target.value)
                        }
                        value={relevancia}
                    />

                    <span> ingresa las subcategorías separadas por (,) </span>
                    <textarea
                        type="text"
                        rows="5"
                        cols="35"
                        placeholder="Ejemplo: depilacion,tratamientos,niño"
                        className="camposTextDescripcion"
                        onChange={(event) =>
                            setsubCategorias(
                                event.target.value.replace(" ", "").toUpperCase()
                            )
                        }
                        value={subCategorias.toUpperCase()}
                    />

                    <div className="contenedorBotonesPublicar">
                        <div className="divInputBotonImagen" for="file" >
                            <div className="divBotonPublicarAmarillo" for="file">
                                <span> Agregar </span>
                                <MdOutlineAddAPhoto
                                    style={{ fontSize: "20px", margin: "0px 0px 0px 5px" }}
                                />
                            </div>
                            <input
                                type="file"
                                id="file"
                                placeholder="Foto"
                                onChange={handleChange}
                            />
                            <label for="file" />
                        </div>
                        <div className="divBotonPublicarVerde" onClick={handleSubmit}>
                            <span> Publicar </span>
                            <BsCloudArrowUp
                                style={{ fontSize: "20px", margin: "0px 0px 0px 5px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <progress className="imageupload__progress" value={progress} max="100" />

            {cropData.length ? (
                <div className="containerPhotos">
                    {cropData.map((image, index) => (
                        <div
                            key={index}
                            className="imageLoaded"
                            onClick={() => {
                                handleDelete(index);
                            }}
                        >
                            <img src={image.url} alt="Imagen" className="image__sel" />
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: "60%",
        height: 350,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default CrearCategoriasSevicios;
