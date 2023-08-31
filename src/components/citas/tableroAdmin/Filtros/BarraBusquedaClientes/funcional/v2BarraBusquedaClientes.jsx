/*
hace la validación falta comunicar con los demás componentes
*/
import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { AiOutlineSearch } from 'react-icons/ai';

import './../../../../../cssGeneral/CssGeneral.css';

import FichaClientes from '../FichaClientes/FichaClientes';
import FiltroServiciosClientes from '../FiltroServiciosClientes/FiltroServiciosClientes';
import FiltroVentasPorClientes from '../FiltroVentasPorClientes/FiltroVentasPorClientes';

const BarraBusquedaClientes = () => {
  const [criterioBusqueda, setcriterioBusqueda] = useState('');

  const [vistaFichaClientes, setvistaFichaClientes] = useState('flex');
  const [vistaServiciosClientes, setvistaServiciosClientes] = useState('none');
  const [vistaVentasPorClientes, setvistaVentasPorClientes] = useState('none');

  function functionRegistroClientes() {
    setvistaFichaClientes('none');
    setvistaServiciosClientes('none');
    setvistaVentasPorClientes('none');
  }

  function functionFichaClientes() {
    setvistaFichaClientes('flex');
    setvistaServiciosClientes('none');
    setvistaVentasPorClientes('none');
  }

  function functionServiciosClientes() {
    setvistaFichaClientes('none');
    setvistaServiciosClientes('flex');
    setvistaVentasPorClientes('none');
  }

  function functionVentasPorClientes() {
    setvistaFichaClientes('none');
    setvistaServiciosClientes('none');
    setvistaVentasPorClientes('flex');
  }

  const validateData = (data) => {
    if (/^\d+$/.test(data)) {
      return 'Número de teléfono';
    } else if (/\S+@\S+\.\S+/.test(data)) {
      return 'Correo electrónico';
    } else {
      return 'Nombre más apellido';
    }
  };

  const dataType = validateData(criterioBusqueda);

  return (
    <>
      <div
        style={{
          alignitems: 'left',
          display: 'flex',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        <Link to="/tablero-administrador">
          <HiArrowNarrowLeft
            style={{
              fontSize: '35px',
              margin: '15px 0px 0px 15px',
              color: '#646464',
            }}
          />
        </Link>
      </div>
      <div className="alineacionHorizontalJustificada">
        <AiOutlineSearch
          className="iconoBarraBusqueda"
          style={{ position: 'relative' }}
        />
        <input
          placeholder="Buscar cliente"
          value={criterioBusqueda}
          onChange={(e) => setcriterioBusqueda(e.target.value.toUpperCase())}
          className="casillaBarraBusqueda"
        />
      </div>
      <div className="contenedorBotonesAccionesFiltroServicios">
        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              functionFichaClientes();
            }}
          >
            Ficha
          </button>
          <div
            style={{ display: `${vistaFichaClientes}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>

        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              functionServiciosClientes();
            }}
          >
            Servicios
          </button>
          <div
            style={{ display: `${vistaServiciosClientes}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>

        <div className="alineacionBotonBarraInferior">
          <button
            className="botonAccionesFiltroClientes"
            onClick={() => {
              functionVentasPorClientes();
            }}
          >
            Productos
          </button>
          <div
            style={{ display: `${vistaVentasPorClientes}` }}
            className="lineaInferiorAccionesClientes"
          />
        </div>
      </div>
      <div className="contenedorVistasAccionesFiltroServicios">
        <div style={{ display: `${vistaFichaClientes}` }}>
          <FichaClientes criterioBusqueda={criterioBusqueda} />
        </div>
        <div style={{ display: `${vistaServiciosClientes}` }}>
          <FiltroServiciosClientes criterioBusqueda={criterioBusqueda} />
        </div>
        <div style={{ display: `${vistaVentasPorClientes}` }}>
          <FiltroVentasPorClientes criterioBusqueda={criterioBusqueda} />
        </div>
      </div>
      <div>
        <p>Dato: {criterioBusqueda}</p>
        <p>Tipo de dato: {dataType}</p>
      </div>
    </>
  );
};

export default BarraBusquedaClientes;
