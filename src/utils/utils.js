// esta funcion es para convertir el numero a moneda
export const convertToMoney = (number) =>
    Intl.NumberFormat(
        // 'es-AR', {  // es para que el formato sea de pesos argentinos camiar a dollar
        //'es-UY', { // es para que el formato sea de pesos uruguayos
         'en-US', { // es para que el formato sea de dollar
        style: 'currency',
        //currency: 'UYU', // camiar a dollar
        currency: 'USD', // camiar a dollar
    }).format(number)

// esta funcion es para convertir la imagen en un archivo de tipo file    
export async function url2file(url) { 
    try {
        const data = await fetch(url);
        const blob = await data.blob();
        const file = new File([blob], 'share.jpg', { type: blob.type });
        return file; // retorna un archivo de tipo file
    } catch (err) {
        //console.error(err.name, err.message);
    }
}

// esta funcion es para convertir la imagen en un archivo de tipo file
export async function convertirImagen(imagen) { 
    try {
        const data = await fetch(imagen);
        const blob = await data.blob();
        const file = new File([blob], 'share.jpg', { type: blob.type });
        return file; // retorna un archivo de tipo file
    } catch (err) {
        //console.error(err.name, err.message);
    }
}

export async function convertirImagenABuffer(imagen) { // esta funcion es para convertir la imagen en un archivo de tipo file
    try {
      const response = await fetch(imagen);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      return arrayBuffer; // retorna un arrayBuffer
    } catch (error) {
      //console.error(error.name, error.message);
    }
  }
  
  export async function convertirImagenABase64(imagen) { // esta funcion es para convertir la imagen en un archivo de tipo file
    try {
      const response = await fetch(imagen);
      const blob = await response.blob();
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      return new Promise((resolve, reject) => { // retorna un base64
        fileReader.onloadend = function () {
          resolve(fileReader.result);
        };
        fileReader.onerror = function (error) {
          reject(error);
        };
      });
    } catch (error) {
      //console.error(error.name, error.message);
    }
  }
  