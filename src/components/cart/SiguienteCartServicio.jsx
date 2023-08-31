import { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import CartContext from "../../context/CartContext";
import NoProductMessage from "./NoProductMessage";
import { db, auth, storage } from "../../firebase";
import SiguienteReciboServicio from "../../vistas/clientes/servicios/siguienteCitaServicio/SiguienteReciboServicio";

const SiguienteCartServicio = () => {
  const {
    contextDiaMasHoraDinamicosSeleccionados,
    contextUsuarioLogueado,
    contextDiaDinamicoSeleccionado,
    contextIdParaActualizar,
  } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);

  /*if (orderId === null) {
        return <NoProductMessage />;
      }*/

  useEffect(() => {
    funcionOcuparHorario();
    //console.log("vamos en ciudad y celularMovil");
  }, []);

  useEffect(() => {
    if (contextIdParaActualizar) {
      //console.log("contextIdParaActualizar", contextIdParaActualizar);
    }
  }, [contextIdParaActualizar]);

  const convertirFechaHoraSeleccionadaMilisegundos = (timestamp) => {
    const fecha = new Date(timestamp);
    const fechaMilisegundos = fecha.getTime();
    return fechaMilisegundos;
  };

  function funcionFechaLegible() {
    let calculoFecha = contextDiaDinamicoSeleccionado.diaCalendario.toDate();
    let fechaLegible =
      calculoFecha.getDate() +
      "/" +
      (calculoFecha.getMonth() + 1) +
      "/" +
      calculoFecha.getFullYear();
    //console.log(fechaLegible.toString(), "fechaLegible");
    return fechaLegible.toString();
  }

  async function funcionOcuparHorario() {
    const ocuparHorario = db.collection("HorariosOcupados");
    const newOcuparHorario = {
      ciudadMasFecha:
        contextUsuarioLogueado.displayName + "/" + funcionFechaLegible(),
      orderId: contextIdParaActualizar,
      uid: contextUsuarioLogueado.uid,
      email: contextUsuarioLogueado.email,
      ciudad: contextUsuarioLogueado.displayName,
      ciudadMasTimeMs:
        contextUsuarioLogueado.displayName +
        convertirFechaHoraSeleccionadaMilisegundos(
          contextDiaMasHoraDinamicosSeleccionados
        ),
      timeMs: convertirFechaHoraSeleccionadaMilisegundos(
        contextDiaMasHoraDinamicosSeleccionados
      ),
      timestamp: contextDiaMasHoraDinamicosSeleccionados,
    };
    try {
      const { id } = await ocuparHorario.add(newOcuparHorario);
      newOcuparHorario.id = id;
      setOrderId(id);
    } catch (err) {
      //console.log(err, "Error");
    }
  }

  async function addToTimeMsArray(docId) {
    let timeMs = convertirFechaHoraSeleccionadaMilisegundos(
      contextDiaMasHoraDinamicosSeleccionados
    );
  
    let timestamp = new Date(timeMs);
  
    const docRef = db.collection("OrdenesServicios").doc(docId);
    try {
      await docRef.update({
        timestamp: timestamp,
        timeMs: firebase.firestore.FieldValue.arrayUnion(timeMs),
        // Update the status field with a new value
        estatusTimeMs: firebase.firestore.FieldValue.arrayUnion({
          statusSesion: "PENDIENTE",
          timeMsSesion: timeMs,
        }),
      });
    } catch (error) {
      //console.error("Error adding element to arrays:", error);
    }
  }
  

  if (orderId) {
    addToTimeMsArray(contextIdParaActualizar);
    return (
      <>
        <SiguienteReciboServicio orderId={orderId} />
      </>
    );
  }

  return null;
};

export default SiguienteCartServicio;
