import { useContext, useState, useEffect } from "react";
import CartContext from "../../context/CartContext";
import NoProductMessage from "./NoProductMessage";
import "firebase";
import firebase from "firebase/app";
import { db, auth, storage } from "../../firebase";
import OriginalReciboServicios from "../../vistas/clientes/servicios/misServicios/OriginalReciboServicios";
import OriginalReciboProductos from "./../../vistas/clientes/originalReciboProductos/OriginalReciboProductos";

const Cart = () => {
  //console.log("llamando a Cart");

  const {
    contextBdOrdenes,
    cartItem,
    costoTotal,
    resetCantCart,
    contextDiaMasHoraDinamicosSeleccionados,
    contextDiaDinamicoSeleccionado, // no se necesita
    contextUsuarioLogueado,
    providerDatosCita,
  } = useContext(CartContext);

  const crearOrden = () => {
    //console.log("vamos en crearOrden");
      if (contextBdOrdenes === "OrdenesProductos") {
        createOrderBdOrdenesProductos();
        //console.log("vamos en createOrderBdOrdenesProductos");
      }
      if (contextBdOrdenes === "OrdenesServicios") {
        createOrderBdOrdenesServicios();
        //console.log("vamos en createOrderBdOrdenesServicios");
      }
  };

  const [orderId, setOrderId] = useState(null);

  if (cartItem.length === 0 && orderId === null) {
    return <NoProductMessage />;
  }

  useEffect(() => {
      crearOrden();
      //console.log("vamos en ciudad y celularMovil");
  }, []);

  async function createOrderBdOrdenesProductos() {
    //  ORDENES PRODUCTOS
    const orders = db.collection("OrdenesProductos");
    const newOrderProductos = {
      cartItem,
      estatusPago: "PENDIENTE",
      estatusDespacho: "PENDIENTE",
      direccion: "PENDIENTE",
      total: costoTotal(),
      timeMs: convertirFechaHoraSistemaMilisegundos(),
      fechaNumero: convertirFechaHoraSistemaMilisegundos(),
      timestamp: new Date(),
      numeroGuia: "ASIGNAR",
    };
    try {
      const { id } = await orders.add(newOrderProductos);
      setOrderId(id);
    } catch (err) {
      //console.log("Error", err);
    }
    const itemsToUpdate = db.collection("OrdenesProductos").where(
      firebase.firestore.FieldPath.documentId(),
      "in",
      cartItem.map((i) => i.id)
    );
    const query = await itemsToUpdate.get();
    const batch = db.batch();

    const outOfStock = [];
    query.docs.forEach((docSnapshot, idx) => {
      if (docSnapshot.data().stock >= cartItem[idx].count) {
        batch.update(docSnapshot.ref, {
          stock: docSnapshot.data().stock - cartItem[idx].count,
          indiceJerarquia:
            docSnapshot.data().indiceJerarquia + cartItem[idx].count,
        });
      } else {
        outOfStock.push({ ...docSnapshot.data(), id: docSnapshot.id });
      }
    });
    if (outOfStock.length === 0) {
      await batch.commit();
    }
    resetCantCart();
    //console.log("resetCantCart en Cart");
  } // fin createOrderBdOrdenesProductos

  async function createOrderBdOrdenesServicios() {
    // ORDENES SERVICIOS
    const orders = db.collection("OrdenesServicios");
    const newOrderProductos = {
      uid: contextUsuarioLogueado.uid,
      email: contextUsuarioLogueado.email,
      cartItem,
      ciudad: contextUsuarioLogueado.displayName,
      estatusPago: "PENDIENTE",
      estatusServicio: "PENDIENTE",
      observaciones: "",
      total: costoTotal(),
      citasAsignadas: 1,
      ciudadMasTimeMs:
      contextUsuarioLogueado.displayName +
        convertirFechaHoraSeleccionadaMilisegundos(
          contextDiaMasHoraDinamicosSeleccionados
        ),
      //timestamp: new Date(),
      //name: "ASIGNAR",
      timeMs: [
        convertirFechaHoraSeleccionadaMilisegundos(
          contextDiaMasHoraDinamicosSeleccionados
        )
      ],
      estatusTimeMs: firebase.firestore.FieldValue.arrayUnion({
        statusSesion: "PENDIENTE",
        timeMsSesion: convertirFechaHoraSeleccionadaMilisegundos(
          contextDiaMasHoraDinamicosSeleccionados
        ), 
      }),
      timestamp: contextDiaMasHoraDinamicosSeleccionados,
      fechaNumero: convertirFechaHoraSistemaMilisegundos(),
    };
    try {
      const { id } = await orders.add(newOrderProductos);
      newOrderProductos.id = id;
      setOrderId(id);
      funcionOcuparHorario(id);
    } catch (err) {
      //console.log(err, "Error");
    }
    /*const itemsToUpdate = db.collection("OrdenesServicios").where(
      firebase.firestore.FieldPath.documentId(),
      "in",
      cartItem.map((i) => i.id)
    );
    const query = await itemsToUpdate.get();
    const batch = db.batch();
    const outOfStock = [];
    query.docs.forEach((docSnapshot, idx) => {
      if (docSnapshot.data().stock >= cartItem[idx].count) {
        batch.update(docSnapshot.ref, {
          stock: docSnapshot.data().stock - cartItem[idx].count,
          indiceJerarquia:
            docSnapshot.data().indiceJerarquia + cartItem[idx].count,
        });
      } else {
        outOfStock.push({ ...docSnapshot.data(), id: docSnapshot.id });
      }
    });
    if (outOfStock.length === 0) {
      await batch.commit();
    }*/
    resetCantCart();
    //funcionProviderDatosCita();
  } // fin createOrderBdOrdenesServicios

// - - - - - - funciones - - - - - - // 

  const convertirFechaHoraSeleccionadaMilisegundos = (timestamp) => {
    const fecha = new Date(timestamp);
    const fechaMilisegundos = fecha.getTime();
    return fechaMilisegundos;
  };

  const convertirFechaHoraSistemaMilisegundos = () => {
    const fecha = new Date();
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


  if (orderId && contextBdOrdenes === "OrdenesServicios") {
    return (
        <>
        <OriginalReciboServicios orderId={orderId} />
        </>
      );
  }

  if (orderId && contextBdOrdenes === "OrdenesProductos") {
    return (
        <OriginalReciboProductos orderId={orderId}  />
    );
}

  /*if (orderId && contextBdOrdenes === "OrdenesServicios") {
    //console.log(orderId, "operacion exitosa");

  }*/


  async function funcionOcuparHorario(id) {
    const ocuparHorario = db.collection("HorariosOcupados");
    const newOcuparHorario = {
      ciudadMasFecha: contextUsuarioLogueado.displayName + "/" + funcionFechaLegible(),
      orderId: id,
      uid: contextUsuarioLogueado.uid,
      email: contextUsuarioLogueado.email,
      cartItem,
      ciudad: contextUsuarioLogueado.displayName,
      estatusPago: "PENDIENTE",
      estatusServicio: "PENDIENTE",
      observaciones: "",
      total: costoTotal(),
      ciudadMasTimeMs:
      contextUsuarioLogueado.displayName +
        convertirFechaHoraSeleccionadaMilisegundos(
          contextDiaMasHoraDinamicosSeleccionados
        ),
      //timestamp: new Date(),
      //name: "ASIGNAR",
      timeMs: convertirFechaHoraSeleccionadaMilisegundos(
        contextDiaMasHoraDinamicosSeleccionados
      ),
      timestamp: contextDiaMasHoraDinamicosSeleccionados,
    };
    try {
      const { id } = await ocuparHorario.add(newOcuparHorario);
      newOcuparHorario.id = id;
    } catch (err) {
      //console.log(err, "Error");
    }
  }

  return null;
};

export default Cart;