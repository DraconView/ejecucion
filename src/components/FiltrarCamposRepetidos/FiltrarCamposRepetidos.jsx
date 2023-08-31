import {useState, useEffect} from 'react';

const originalArr = [
    { ciudad: "Minas" },
    { ciudad: "Piriápolis" },
    { ciudad: "Maldonado" },
    { ciudad: "Maldonado" },
    { ciudad: "Trinidad" },
    { ciudad: "Melo" }
  ];

const FiltarCamposRepetidos = (originalArr) => {


    const [arrFiltrado, setArrFiltrado] = useState([]);

    useEffect(() => {
        ciudadesSinRepetir(originalArr);
    }, []);

    function ciudadesSinRepetir(originalArr) {
        let arrFiltrado = [];
        originalArr.forEach((item) => {
            let i = arrFiltrado.findIndex((x) => x.ciudad === item.ciudad);
            if (i <= -1) {
                arrFiltrado.push({ ciudad: item.ciudad });
            }
        });
        return setArrFiltrado(arrFiltrado);
    }

    return arrFiltrado;
}

export default FiltarCamposRepetidos;

