
/* -- COMPARAR DATOS REPETIDOS -- 
export async function CompararDatosRepetidos(list) {
  let letArrayFiltrado = [];
  list.forEach((item) => {
    let i = letArrayFiltrado.findIndex(
      (x) => x.fechaNavegacion === item.fechaNavegacion
    );
    if (i <= -1) {
      letArrayFiltrado.push({
        fechaNavegacion: item.fechaNavegacion,
        id: item.id,
        visibilidad: "ACTIVO",
        fechaLegible: item.fechaLegible,
        stock: item.stock,
      });
    }
  });
  return letArrayFiltrado;
}
*/

// -- COMPROBAR EXISTENCIA DATO -- ObjetoComprobado
export async function ComprobarExistenciaDato(list, dato) { 
    let retornoObjetoComprobado = [];
    list.forEach((item) => {
        if (item.numero === dato) {
        retornoObjetoComprobado.push({
            numero: item.numero,
            fechaNavegacion: item.fechaNavegacion,
            fechaLegible: item.fechaLegible,
            visibilidad: item.visibilidad,
            stock: item.stock,
        });
        }
    });
    return retornoObjetoComprobado;
    }

