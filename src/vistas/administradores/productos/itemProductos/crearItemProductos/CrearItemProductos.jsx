import { Button, Modal, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { db, auth, storage } from "../../../../../firebase/index";
import axios from "axios";
import { REACT_APP_API_URL } from "../../../../../components/config/config";
import { resizeImage } from "../../../../../helpers/resizeImage";
import Cropper from "react-cropper";
import "react-cropper/dist/cropper.css";
import { Link } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BsCloudArrowUp } from "react-icons/bs";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function CrearItemProductos() {

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
  const [stock, setstock] = useState();
  const [price, setprice] = useState('');
  const [descripcion, setdescripcion] = useState("");

  const [vistaFormulario, setvistaFormulario] = useState("flex");
  const [vistaEnviandoDatos, setvistaEnviandoDatos] = useState("none");
  const [vistaDatoRecibido, setvistaDatoRecibido] = useState("none");

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
        db.collection("ItemProductos").add({
          timestamp: new Date(),
          categoryId: categoryId,
          img: urlImages,
          //sername: username,
          name: name,
          relevancia: Number(relevancia),
          stock: Number(stock),
          price: price,
          visibilidad: "ACTIVO",
          descripcion: descripcion,
          indiceJerarquia: 0,
        });
        setProgress(0);
        setname("");
        setcategoryId("");
        setrelevancia("");
        setstock("");
        setprice("");
        setImage(null);
        setCropData([]);
        setdescripcion("");
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

  useEffect(() => {
    if (progress > 1) {
      setvistaFormulario("none");
      setvistaEnviandoDatos("flex");
    } else {
      setvistaFormulario("flex");
      setvistaEnviandoDatos("none");
    }
  }, [progress]);

  useEffect(() => {
    // vistaDatoRecibido none luego de 3 segundos
    if (progress > 99) {
    //if (progress === 0) {
      setvistaDatoRecibido("flex");
      setTimeout(() => {
        setvistaDatoRecibido("none");
      }, 3000);
    }
  }, [progress]);

  return (
    <div className="alineacionVertical">
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
      <div
        className="alineacionVerticalFlexEspera"
        style={{ display: `${vistaFormulario}` }}
      >
        <form onSubmit={handleSubmit} className="formularioRegistroClientes">
        <div className="alineacionHorizontalJustificada">
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese la categoría"
            className="casillaFormulario"
            onChange={(event) =>
              setcategoryId(event.target.value.replace(" ", "").toUpperCase())
            }
            value={categoryId}
          />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese el nombre"
            className="casillaFormulario"
            onChange={(event) =>
              setname(event.target.value.toUpperCase())
            }
            value={name}
          />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
          <textarea
            type="number"
            cols="35"
            rows="1"
            placeholder=" Ingrese la relevancia"
            className="casillaFormulario"
            onChange={(event) => setrelevancia(event.target.value)}
            value={relevancia}
          />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
          <textarea
            type="number"
            cols="35"
            rows="1"
            placeholder=" Ingrese el stock"
            className="casillaFormulario"
            onChange={(event) => setstock(event.target.value)}
            value={stock}
          />
          </div>
          <div className="divDividerFormulario" />

          <div className="alineacionHorizontalJustificada">
          <textarea
            type="text"
            cols="35"
            rows="1"
            placeholder=" Ingrese el precio"
            className="casillaFormulario"
            onChange={(event) => setprice(event.target.value)}
            value={price}
          />
          </div>
          <div className="divDividerFormulario" />

          <div className="divCasillaEstatusServicosDescripcion">
            <span className="tituloObservacionTratamiento">
            descripción del producto
            </span>
          </div>
          <div className="divCasillaDescripcionServicio">
          <textarea
            type="text"
            rows="5"
            cols="35"
            placeholder="Descripcion de la producto"
            className="casillaDescripcionServicio"
            onChange={(event) => setdescripcion(event.target.value)}
            value={descripcion}
          />
          </div>

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
        </form>
      </div>

      {/* vista registrando datos */}
      <div
        className="alineacionVerticalFlexEspera"
        style={{ display: `${vistaEnviandoDatos}` }}
      >
        <div className="divRegistro">
          <div className="divTextoRegistro">
            <span className="textoRegistrando">registrando...</span>
          </div>
          <progress
            className="imageupload__progress"
            value={progress}
            max="100"
          />
        </div>
      </div>

      {/* mensaje por tres segundos de registro exitoso */}
      <div
        className="divFlotanteRegistroExitoso"
        style={{
          display: `${vistaDatoRecibido}`,
          position: "absolute",
          top: "115px",
          //right: "80px",
          alignitems: "center",
        }}
      >
        <span className="textoRegistroExitosoAlert">!registro exitoso!</span>
      </div>

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

export default CrearItemProductos;
