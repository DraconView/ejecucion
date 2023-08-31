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
        fechaMesEscrito: item.fechaMesEscrito,
      });
    }
  });
  return letArrayFiltrado;
}
