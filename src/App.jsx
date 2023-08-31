import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Error404 from "./components/error404/Error404";
import Cart from "./components/cart/Cart";
import ItemListContainer from "./containers/itemListContainer/ItemListContainer";
import ItemDetailContainer from "./containers/itemDetailContainer/ItemDetailContainer";
import { CartProvider } from "./context/CartProvider";
//import BasicSpeedDial from './components/plusOpciones/BasicSpeedDial' //nueva insercion
//import LateralIzquierdo from './components/LateralIzquierdo'  <LateralIzquierdo />
import MapFichaDeposito from "./components/tableroControl/depositoFicha/MapFichaDeposito.jsx";
import LoginTablero from "./components/tableroControl/loginTablero/LoginTablero";
import Contacto from "./components/integraciones/Contacto.jsx";
import UnionTableroEdicionCategorias from "./components/tableroControl/ContenedorEdiciones/UnionTableroEdicionCategorias";
import UnionTableroEdicionLogo from "./components/tableroControl/ContenedorEdiciones/UnionTableroEdicionLogo";
import EdicionProductos from "./components/tableroControl/edicionPublicaciones/EdicionProductos";
import EdicionCategorias from "./components/tableroControl/edicionCategorias/EdicionCategorias";
import EdicionLogo from "./components/tableroControl/EdicionLogo/EdicionLogo";
import BdInicioCategorias from "./components/inicioCategorias/BdInicioCategorias";
import UserSubirLogo from "./components/tableroControl/publicador/SubirLogo/UserSubirLogo";
//import BdReciboTablero from "./components/tableroControl/ventas/reciboTablero/BdReciboTablero";
import Divisor from "./components/navbar/Divisor";
import EdicionReciboVentas from "./components/tableroControl/ventas/edicionReciboVentas/EdicionReciboVentas";
import AgendarCita2 from "./components/citas/tableroAdmin/AgendarCitas/AgendarCita2";
import CrearCategoriasSevicios from "./components/citas/tableroAdmin/crear/crearCategorias/CrearCategoriasSevicios";
import RegistroClientes from "./components/citas/tableroAdmin/crear/RegistroClientes/RegistroClientes";
import CrearItemServicios from "./vistas/administradores/servicios/itemServicios/crearItemServicios/CrearItemServicios";
import BdItemServicios from "./components/citas/InicioCitas/ItemServicios/BdItemServicios";
import CrearHorariosCitas from "./components/citas/tableroAdmin/crear/crearHorariosCitas/ManualCrearHorariosCitas";
import BdDiasDisponibles from "./components/citas/InicioCitas/DiasDisponibles/ManualBdDiasDisponibles";
import BdHoraDisponibles from "./components/citas/InicioCitas/HoraDisponibles/ManualBdHoraDisponibles";
import CrearCiudad from "./vistas/administradores/ciudades/crearCiudad/CrearCiudad";
import CrearHorarioCalendario from "./vistas/administradores/servicios/horariosCiudades/CrearHorarioCalendario";
import SeleccionCiudadCita from "./vistas/clientes/servicios/seleccionCiudadCita/SeleccionCiudadCita";
import CrearItemProductos from "./vistas/administradores/productos/itemProductos/crearItemProductos/CrearItemProductos";
import BusquedaItemServicios from "./vistas/administradores/servicios/itemServicios/busquedaItemServicios/BusquedaItemServicios";
import DiasDisponiblesDinamicos from "./vistas/clientes/servicios/diasDisponiblesDinamicos/DiasDisponiblesDinamicos";
import HorasDisponiblesDinamicas from "./vistas/clientes/servicios/horasDisponiblesDinamicos/HorasDisponiblesDinamicas";
//import VistaCerebro from "./components/cerebro/VistaCerebro";
import ContextServicios from "./context/contextServicios/ContextServicios";
import ContextCiudades from "./context/contextCiudades/ContextCiudades";
import ContextHorariosCalendario from "./context/contextHorariosCalendario/ContextHorariosCalendario";
import CrearHorariosCiudades from "./vistas/administradores/servicios/horariosCiudades/CrearHorariosCiudadesRango";
import SeleccionarMultiplesImagenes from "./components/seleccionarMultiplesImagenes/SeleccionarMultiplesImagenes";
import DiasDisponiblesCalendario from "./vistas/clientes/servicios/diasDisponiblesCalendario/DiasDisponiblesCalendario";
import HorasDisponiblesCalendario from "./vistas/clientes/servicios/horasDisponiblesCalendario/HorasDisponiblesCalendario";
import CrearDiasCalendario from "./vistas/administradores/servicios/diasCalendario/crearDiasCalendario/CrearDiasCalendario";
import OpcionesDeHorarios from "./vistas/administradores/servicios/diasCalendario/opcionesDeHorarios/OpcionesDeHorarios";

// - - - - - - ORGANIZADO - - - - - - //

// HERRAMIENTAS
import CompararTextosConLibreria from "./vistas/herramientas/compararTextos/CompararTextosConLibreria";
import CompararTextosSinLibreria from "./vistas/herramientas/compararTextos/CompararTextosSinLibreria";
import OrganizarAlfabeticamente from "./vistas/herramientas/organizarAlfabeticamente/OrganizarAlfabeticamente";
import LimpiarLocalStorage from "./vistas/herramientas/limpiarLocalStorage/LimpiarLocalStorage";
import ConvertirTextoVoz from "./vistas/herramientas/convertirTextoVoz/ConvertirTextoVoz";
import CualEsMiIpVanilla from "./vistas/herramientas/cualEsMiIp/cualEsMiIpVanilla";
import CualEsMiIpApi from "./vistas/herramientas/cualEsMiIp/CualEsMiIpApi";

// SEGURIDAD
import Login from "./vistas/login/Login";
import Registrarse from "./vistas/login/Registrarse";
import CiudadRegistro from "./vistas/login/CiudadRegistro";

// SOLO ADMINISTRADORES
import TableroAdministrador from "./vistas/administradores/tablero/TableroAdministrador";
import RegistroRol from "./vistas/administradores/registroRol/RegistroRol";
import OpcionesDeCiudades from "./vistas/administradores/ciudades/OpcionesDeCiudades";
import CiudadesCreadas from "./vistas/administradores/ciudades/ciudadesCreadas/CiudadesCreadas";
import OpcionesDeMercadopago from "./vistas/administradores/enlacePagos/OpcionesDeMercadopago";
import OpcionesProductos from "./vistas/administradores/productos/OpcionesProductos";
import OpcionesUsuarios from "./vistas/administradores/usuarios/OpcionesUsuarios";
import AnaliticaConDatosFire from "./vistas/administradores/analitica/AnaliticaConDatosFire";

// SOLO CLIENTES
import FiltroPorIdServicios from "./components/citas/InicioCitas/DetailServicios/FiltroPorIdServicios";
import FiltroPorIdProductos from "./vistas/clientes/productos/detailProductos/FiltroPorIdProductos";
import TableroClientes from "./vistas/clientes/tablero/TableroCLientes";
import LoginAccionUsuario from "./vistas/login/LoginAccionUsuario";
import RegistrarseAccionUsuario from "./vistas/login/RegistrarseAccionUsuario";
import TableCart from "./components/cart/TableCart";
import MisServicios from "./vistas/clientes/servicios/misServicios/MisServicios";
import OriginalReciboServicios from "./vistas/clientes/servicios/misServicios/OriginalReciboServicios";
import MiPerfil from "./vistas/clientes/miPerfil/MiPerfil";
import SiguienteReciboServicio from "./vistas/clientes/servicios/siguienteCitaServicio/SiguienteReciboServicio";
import MediosDePago from "./vistas/mediosDePago/MediosDePago";
import SiguienteCartServicio from "./components/cart/SiguienteCartServicio";
import SiguienteDiaServicio from "./vistas/clientes/servicios/siguienteCitaServicio/SiguienteDiaServicio";
import SiguienteHoraServicio from "./vistas/clientes/servicios/siguienteCitaServicio/SiguienteHoraServicio";
import ConnectionBdProductos from "./vistas/clientes/productos/itemProductos/ConeccionBdProductos";
import BdCategoriasProductos from "./vistas/clientes/productos/categoriasProductos/BdCategoriasProductos";
import ProductoFiltroCategoria from "./vistas/clientes/productos/itemProductos/ProductoFiltroCategoria";

// SOLO ASISTENTES
import TableroAsistentes from "./vistas/asistentes/tablero/TableroAsistentes";

// CLIENTES , ASISTENTES , ADMINISTRADORES
import PresentacionNumeroDinamico from "./components/Presentacion/presentacionNumeroDinamico/PresentacionNumeroDinamico";
import PresentacionNumeroPrincipal from "./components/Presentacion/presentacionNumeroPrincipal/PresentacionNumeroPrincipal";
import PresentacionNumeroPrincipalAsincrona from "./components/Presentacion/presentacionNumeroPrincipal/PresentacionNumeroPrincipalAsincrona";
import SkinlaserPresentacionNumeroPrincipalAsincrona from "./components/Presentacion/presentacionNumeroPrincipal/SkinlaserPresentacionNumeroPrincipalAsincrona";
import RestaurantesPresentacion from "./components/Presentacion/presentacionNumeroPrincipal/RestaurantesPresentacion";

// COMPOPONENTES
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import FlotanteContacto from "./components/flotanteContacto/FlotanteContacto";
import FlotanteContactoMensaje from "./components/flotanteContactoMensaje/FlotanteContactoMensaje";

/* PRUEBAS 
import ConeccionMySql from "./coneccionesBd/ConeccionMySql"; */

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Switch>
          <Redirect from="/react-ecommerce" to="/" />

          {/* SEGURIDAD */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registrarse">
            <Registrarse />
          </Route>
          <Route exact path="/ciudad-registro">
            <CiudadRegistro />
          </Route>


          {/* CLIENTES , ASISTENTES , ADMINISTRADORES */}
          <Route exact path="/tel/:phone">
            <ContextHorariosCalendario />
            <PresentacionNumeroDinamico />
          </Route>
          <Route exact path="/">
            <ContextHorariosCalendario />
            <RestaurantesPresentacion />
          </Route>

          {/* SOLO CLIENTES */}
          <Route exact path="/login-accion-usuario">
            <LoginAccionUsuario />
          </Route>
          <Route exact path="/mi-perfil">
            <MiPerfil />
          </Route>
          <Route exact path="/registrarse-accion-usuario">
            <RegistrarseAccionUsuario />
          </Route>
          <Route exact path="/detalles-servicios/:productId">
            <Navbar />
            <FiltroPorIdServicios />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/detalles-productos/:productId">
            <Navbar />
            <FiltroPorIdProductos />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/siguiente-cart-servicio">
            <SiguienteCartServicio />
          </Route>
          <Route exact path="/tablero-clientes">
            <TableroClientes />
          </Route>
          <Route exact path="/table-cart">
            <Navbar />
            <TableCart />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/mis-servicios">
            <MisServicios />
          </Route>
          <Route exact path="/recibo-final">
            <OriginalReciboServicios />
          </Route>
          <Route exact path="/medios-de-pago">
            <MediosDePago />
          </Route>
          <Route exact path="/siguiente-dia-servicio">
            <SiguienteDiaServicio />
          </Route>
          <Route exact path="/siguiente-hora-servicio">
            <SiguienteHoraServicio />
          </Route>
          <Route exact path="/siguiente-recibo-servicio">
            <SiguienteReciboServicio />
          </Route>
          <Route exact path="/seleccion-item-productos">
            <Navbar />
            <ConnectionBdProductos />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/categorias-productos">
            <Navbar />
            <BdCategoriasProductos />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/seleccion-servicios">
            <Navbar />
            <BdItemServicios />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/producto-filtro-categoria/:categoryIdProducto">
            <Navbar />
            <ProductoFiltroCategoria />
            <FlotanteContactoMensaje />
            <Footer />  
          </Route>

          {/* SOLO ADMINISTRADORES */}
          <Route exact path="/tablero-administrador">
            <ContextHorariosCalendario />
            <TableroAdministrador />
          </Route>
          <Route exact path="/registro-rol">
            <RegistroRol />
          </Route>
          <Route exact path="/opciones-de-ciudades">
            <OpcionesDeCiudades />
          </Route>
          <Route exact path="/ciudades-creadas">
            <CiudadesCreadas />
          </Route>
          <Route exact path="/opciones-de-mercadopago">
            <OpcionesDeMercadopago />
          </Route>
          <Route exact path="/opciones-productos">
            <OpcionesProductos />
          </Route>
          <Route exact path="/opciones-usuarios">
            <OpcionesUsuarios />
          </Route>
          <Route exact path="/analitica">
            <AnaliticaConDatosFire />
          </Route>

          {/* SOLO ASISTENTES */}
          <Route exact path="/tablero-asistentes">
            <TableroAsistentes />
          </Route>

          {/* HERRAMIENTAS */}
          <Route exact path="/comparar-textos-con-libreria">
            <CompararTextosConLibreria />
          </Route>
          <Route exact path="/comparar-textos-sin-libreria">
            <CompararTextosSinLibreria />
          </Route>
          <Route exact path="/organizar-alfabeticamente">
            <OrganizarAlfabeticamente />
          </Route>
          <Route exact path="/limpiar-local-storage">
            <LimpiarLocalStorage />
          </Route>
          <Route exact path="/convertir-texto-voz">
            <ConvertirTextoVoz />
          </Route>
          <Route exact path="/cual-es-mi-ip-vanilla">
            <CualEsMiIpVanilla />
          </Route>
          <Route exact path="/cual-es-mi-ip-api">
            <CualEsMiIpApi />
          </Route>

          {/* PRUEBAS 
          <Route exact path="/coneccion-mysql">
            <ConeccionMySql />
          </Route> */}

          {/* ---------------------- PENDIENTE ORDENAR ---------------------- */}

          <Route exact path="/crear-dias-calendario">
            <CrearDiasCalendario />
          </Route>
          <Route exact path="/dias-disponibles-calendario">
            <Navbar />
            <DiasDisponiblesCalendario />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/horas-disponibles-calendario">
            <Navbar />
            <HorasDisponiblesCalendario />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>

          {/******** COMPONENTES CITAS ********/}

          <Route exact path="/crear-ciudad-citas">
            <CrearCiudad />
          </Route>

          {/**************   SIN ORDENAR   **************/}

          {/* TABLERO CITAS */}

          <Route exact path="/crear-horarios-citas-manuales">
            <CrearHorariosCitas />
          </Route>
          <Route exact path="/opciones-servicios">
            <BusquedaItemServicios />
          </Route>
          <Route exact path="/registro-clientes">
            <RegistroClientes />
          </Route>
          <Route exact path="/crear-horario-citas-calendario">
            <CrearHorarioCalendario />
          </Route>
          <Route exact path="/agendar-cita">
            <AgendarCita2 />
          </Route>
          <Route exact path="/crear-categorias-sevicios">
            <CrearCategoriasSevicios />
          </Route>
          <Route exact path="/crear-horarios-ciudades">
            <CrearHorariosCiudades />
          </Route>
          <Route exact path="/opciones-de-horarios">
            <OpcionesDeHorarios />
          </Route>

          <Route exact path="/seleccionar-multiples-imagenes">
            <SeleccionarMultiplesImagenes />
          </Route>

          {/* CLIENTES CITAS */}

          <Route exact path="/confirmacion-fecha-hora/:fechaNavegacion">
            <Navbar />
            <BdHoraDisponibles />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/seleccion-ciudad-cita">
            <Navbar />
            <SeleccionCiudadCita />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>

          {/* PERSONALIZACION */}

          <Route exact path="/inicio">
            <FlotanteContactoMensaje />
          </Route>
          <Route exact path="/contacto">
            <Contacto />
          </Route>
          <Route exact path="/opciones-logo">
            <UnionTableroEdicionLogo />
          </Route>
          <Route exact path="/subir-logo">
            <UserSubirLogo />
          </Route>
          <Route exact path="/edicion-logo">
            <EdicionLogo />
          </Route>

          {/* VISTA DE CLIENTES */}

          <Route exact path="/cart">
            <Navbar />
            <Divisor />
            <Cart />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/categories/:categoryId">
            <Navbar />
            <ItemListContainer />
            <FlotanteContactoMensaje />
          </Route>
          <Route exact path="/item/:productId">
            <Navbar />
            <ItemDetailContainer />
            <FlotanteContactoMensaje />
          </Route>
          <Route exact path="/dias-disponibles-dinamicos">
            <Navbar />
            <DiasDisponiblesDinamicos />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>
          <Route exact path="/horas-disponibles-dinamicas">
            <Navbar />
            <HorasDisponiblesDinamicas />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>

          <Route exact path="/dias-disponibles-estaticos">
            <Navbar />
            <BdDiasDisponibles />
            <FlotanteContactoMensaje />
            <Footer />
          </Route>

          {/* TABLERO PRODUCTOS*/}

          <Route exact path="/deposito">
            <MapFichaDeposito />
          </Route>
          <Route exact path="/edicion-recibo-ventas">
            <EdicionReciboVentas />
          </Route>
          <Route exact path="/crear-item-produtos">
            <CrearItemProductos />
          </Route>
          <Route exact path="/edicion-productos">
            <EdicionProductos />
          </Route>
          <Route exact path="/opciones-categorias">
            <UnionTableroEdicionCategorias />
          </Route>
          <Route exact path="/edicion-categorias-inicio">
            <EdicionCategorias />
          </Route>

          <Route path="*" component={Error404} />
        </Switch>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

/*
import ReciboVenta from "./vistas/clientes/originalReciboProductos/OriginalReciboProductos";

          <Route exact path="/recibo/:productId">
            <ReciboVenta />
          </Route>

          */