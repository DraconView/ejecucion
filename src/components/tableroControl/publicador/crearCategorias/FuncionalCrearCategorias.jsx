import { Button, Modal, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { db, auth, storage } from "./../../../../firebase/index";
import axios from "axios";
import { REACT_APP_API_URL } from '../../../config/config';
import { resizeImage } from "./../../../../helpers/resizeImage";
import Cropper from "react-cropper";
//import "cropperjs/dist/cropper.css";
import { BsCloudArrowUp } from "react-icons/bs";
import { MdOutlineAddAPhoto } from "react-icons/md";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function CrearCategorias({}) {
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
  //const [arraySubCategorias, setarraySubCategorias] = useState([]);

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
            `${REACT_APP_API_URL}/api/upload`,
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
        db.collection("CategoriasProductos").add({
          timestamp: new Date(),
          categoryId: categoryId,
          img: urlImages,
          //username: username,
          name: categoryId,
          relevancia: Number(relevancia),
          visibilidad: "ACTIVO",
          subCategorias: subCategorias,
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
    <div className="imageupload">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          {image && (
            <div className="containerMain">
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
            className={classes.camposText}
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
            className={classes.camposTextDos}
            onChange={(event) => setrelevancia(event.target.value)}
            value={relevancia}
          />
          <span> ingresa las subcategorías separadas por (,) </span>
          <textarea
            type="text"
            rows="5"
            cols="35"
            placeholder="Ejemplo: dama,caballero,niño"
            className={classes.camposTextDescripcion}
            onChange={(event) =>
              setsubCategorias(
                event.target.value.replace(" ", "").toUpperCase()
              )
            }
            value={subCategorias.toUpperCase()}
          />

          <div className="contenedorBotonesPublicar">
            <div className="divInputBotonImagen" htmlFor="file">
              <div className="divBotonPublicarAmarillo" htmlFor="file">
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
              <label htmlFor="file" />
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

export default CrearCategorias;
