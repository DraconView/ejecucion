import { useEffect, useState } from 'react';
import "./../../cssGeneral/CssGeneral.css";
import { Link } from 'react-router-dom';

const ListBurgerItem = ({ list }) => {

  //filtrar las categorias existentes
  useEffect(() => {

    


useEffect(() => {
  if (list) {
    //console.log(list, "ListBurgerItem");
  }
}, [list]);

return null;
  
};

export default ListBurgerItem;

/*
    return (
        <div>
            <div className="alineacionVerticalSinWidth" style={{ margin:'20px 0px 20px 0px' }}>
                <span className="textoBurgerCategorias">SERVICIOS</span>
                {list.map((product) => (
                    <div className="divBurgerCategorias" key={product.id}>
                        <Link to={`/categories/${product.categoryId}-${product.subCategorias}`} style={{ textDecoration: 'none' }}>
                            <div className="divTextosburgerCategorias" >
                                <span>{product.name}</span>    
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>    
    );
    */

    const objetoCategoriasItem = [
      {
          "timestamp": {
              "seconds": 1682609778,
              "nanoseconds": 860000000
          },
          "name": "Medias Piernas",
          "indiceJerarquia": 292,
          "categoryId": "SERVICIOS",
          "price": "1950",
          "descripcion": "Precio por cada sesión, Medias Piernas",
          "visibilidad": "ACTIVO",
          "stock": 99708,
          "relevancia": null,
          "duracionCita": 30,
          "img": [
              "https://draconsoftware.com/storage/files/okj0dgYMTjMkmGoOGMy1LXshI9ofhSvObebrn9QB.jpg"
          ],
          "zonaDepilacion": "Precio por sesión - Medias piernas",
          "id": "2Vvi98YQz9CiGwKOvFYh"
      },
      {
          "img": [
              "https://draconsoftware.com/storage/files/5UhttiLOKNTCNub0hv9ecliSDEaDGdGD1vofDpnt.jpg"
          ],
          "relevancia": null,
          "timestamp": {
              "seconds": 1688509994,
              "nanoseconds": 405000000
          },
          "categoryId": "ZONASPEQUEÑAS",
          "stock": 100000,
          "price": "600",
          "zonaDepilacion": "Zonas Pequeñas",
          "visibilidad": "ACTIVO",
          "name": "Zonas Pequeñas",
          "indiceJerarquia": 0,
          "descripcion": "",
          "id": "4ks4oe4YVOl0kTlsc5bM"
      },
      {
          "categoryId": "PROMOCIONES",
          "timestamp": {
              "seconds": 1682609603,
              "nanoseconds": 873000000
          },
          "price": "2900",
          "indiceJerarquia": 18,
          "relevancia": null,
          "descripcion": "Piernas completas, precio por sesión",
          "img": [
              "https://draconsoftware.com/storage/files/Osjad4mAfA4SH762vPddp60o2b1yYN2obeuCyrm8.jpg"
          ],
          "zonaDepilacion": "Precio por sesión - Piernas",
          "name": "Piernas completas",
          "duracionCita": 30,
          "stock": 99982,
          "visibilidad": "ACTIVO",
          "id": "La8v83RxGpm8XlWMjmXi"
      },
      {
          "descripcion": "Mentón - Precio por sesión",
          "name": "Mentón",
          "relevancia": 0,
          "categoryId": "SERVICIOS",
          "zonaDepilacion": "Mentón - Precio por sesión",
          "price": "600",
          "visibilidad": "ACTIVO",
          "indiceJerarquia": 7,
          "timestamp": {
              "seconds": 1682623333,
              "nanoseconds": 702000000
          },
          "duracionCita": 30,
          "stock": 99993,
          "img": [
              "https://draconsoftware.com/storage/files/ndn6g6vrgWm7luN4MIsh5zDH7Um2FM1yV5B0UNpC.jpg"
          ],
          "id": "06HdukaxhmcN8qcVymuE"
      },
      {
          "timestamp": {
              "seconds": 1682623285,
              "nanoseconds": 298000000
          },
          "img": [
              "https://draconsoftware.com/storage/files/ykVtLWlyh6w52S139sA9RIPz4nUaBxbknPTTlowr.jpg"
          ],
          "stock": 100000,
          "zonaDepilacion": "Bozo - Precio por sesión",
          "relevancia": 0,
          "descripcion": "Bozo - Precio por sesión",
          "price": "600",
          "indiceJerarquia": 0,
          "visibilidad": "ACTIVO",
          "duracionCita": 30,
          "name": "Bozo",
          "categoryId": "SERVICIOS",
          "id": "6xZNAVmUyATMUgNq0j1x"
      },
      {
          "descripcion": "Precio por cada sesión - Rostro completo",
          "zonaDepilacion": "Todo rostro - Precio por sesión",
          "img": [
              "https://draconsoftware.com/storage/files/2MMPk2fiISWgKHIMepSaeOqKenAcMpbCbxavkGpP.jpg"
          ],
          "visibilidad": "ACTIVO",
          "price": "1750",
          "duracionCita": 30,
          "categoryId": "SERVICIOS",
          "timestamp": {
              "seconds": 1682609853,
              "nanoseconds": 349000000
          },
          "stock": 100000,
          "name": "Rostro Completo",
          "indiceJerarquia": 0,
          "relevancia": 0,
          "id": "R6A83ABWEmckpEkYUQ1f"
      },
      {
          "timestamp": {
              "seconds": 1682623386,
              "nanoseconds": 766000000
          },
          "name": "Bozo y Mentón",
          "descripcion": "Bozo y Mentón - Precio por sesión",
          "visibilidad": "ACTIVO",
          "relevancia": 0,
          "stock": 100000,
          "price": "1000",
          "img": [
              "https://draconsoftware.com/storage/files/Q9C2rpd28oFaEl06Lj2Ls2o8BHVgheQcsMwWEAKd.jpg"
          ],
          "categoryId": "SERVICIOS",
          "indiceJerarquia": 0,
          "zonaDepilacion": "Bozo y Mentón - Precio por sesión",
          "duracionCita": 30,
          "id": "Ux0LiYBzgzIzZuSOwrFk"
      },
      {
          "relevancia": 0,
          "descripcion": "Espalda - Precio por sesión",
          "name": "Espalda",
          "duracionCita": 30,
          "stock": 100000,
          "timestamp": {
              "seconds": 1682623476,
              "nanoseconds": 777000000
          },
          "visibilidad": "ACTIVO",
          "categoryId": "SERVICIOS",
          "price": "1950",
          "img": [
              "https://draconsoftware.com/storage/files/956191n2f52mi0PbZHmUPhqH7UkwC9ydf7DFuRcn.jpg"
          ],
          "indiceJerarquia": 0,
          "zonaDepilacion": "Espalda - Precio por sesión",
          "id": "ytqB6hDgGUhvIAPKxJtN"
      },
      {
          "img": [
              "https://draconsoftware.com/storage/files/lqzbJYa2cNmBgvJUg29xVY4e8W58E137rhZksQIc.png"
          ],
          "descripcion": "Estás buscando que tus axilas se vean perfectas? En SkinLáser sabemos como hacer para que la mejor tecnología te brinde los resultados rápidos y efectivos que esperas!. Sabes porqué nos prefieren?",
          "categoryId": "SERVICIOS",
          "timestamp": {
              "seconds": 1682385391,
              "nanoseconds": 757000000
          },
          "relevancia": 1,
          "duracionCita": 30,
          "zonaDepilacion": "AXILAS",
          "visibilidad": "ACTIVO",
          "name": "AXILAS",
          "stock": 100000,
          "indiceJerarquia": 0,
          "price": "900",
          "id": "B3WekI98RSPidCbVVvOT"
      },
      {
          "img": [
              "https://draconsoftware.com/storage/files/CUW9VpS0MHKz8i0Xcr1kuhD0IGZZHJd7uAvNkYlK.png"
          ],
          "categoryId": "SERVICIOS",
          "zonaDepilacion": "CUERPO ENTERO",
          "price": "7100",
          "name": "CUERPO ENTERO",
          "duracionCita": 60,
          "stock": 100000,
          "descripcion": "La inversión que te ofrece los mejores beneficios, elimina definitivamente el vello en todo tu cuerpo! Has pensado cuánto cambia tu vida sin tener que depilarte?En SkinLáser sabemos como hacer para que la mejor tecnología te brinde los resultados rápidos y efectivos que esperas!. Sabes porqué nos prefieren?",
          "relevancia": 2,
          "timestamp": {
              "seconds": 1682385559,
              "nanoseconds": 31000000
          },
          "visibilidad": "ACTIVO",
          "indiceJerarquia": 0,
          "id": "Lcv7lXKbx9ZL73Wof9CV"
      },
      {
          "duracionCita": 30,
          "categoryId": "SERVICIOS",
          "timestamp": {
              "seconds": 1682385788,
              "nanoseconds": 263000000
          },
          "indiceJerarquia": 0,
          "descripcion": "Estás buscando sentirte realmente libre? Con el cavado completo eliminas definitivamente los vellos en toda la zona íntima incluye línea interglutea (tira de cola)En SkinLáser sabemos como hacer para que la mejor tecnología te brinde los resultados rápidos y efectivos que esperas!. Sabes porqué nos prefieren?",
          "visibilidad": "ACTIVO",
          "name": "CAVADO COMPLETO",
          "img": [
              "https://draconsoftware.com/storage/files/1RmzyQja2anArH1Hp43HeRYGnxaiceguFCP3mAtE.png"
          ],
          "relevancia": 3,
          "stock": 100000,
          "price": "1950",
          "zonaDepilacion": "CAVADO COMPLETO",
          "id": "KqjAo9bqa23wM2UOTyGf"
      },
      {
          "categoryId": "PROMOCIONES",
          "relevancia": 3,
          "duracionCita": 30,
          "descripcion": "Vienen 2 amigas, contratan cavado completo y les regalamos las axilas! Además si pagan las 6 sesiones tienen un 20% de descuento (con cualquier tarjeta de crédito)",
          "visibilidad": "ACTIVO",
          "zonaDepilacion": "Promo 2 amigas (pack 6 sesiones)",
          "stock": 100000,
          "timestamp": {
              "seconds": 1682552720,
              "nanoseconds": 418000000
          },
          "name": "Promo 3",
          "price": "9360",
          "img": [
              "https://draconsoftware.com/storage/files/ITc515QBQ60pN7jFKCQHiKnbQDlJwt5ZzjzQZr75.jpg"
          ],
          "indiceJerarquia": 0,
          "id": "W8kMRJ4y766dfMI4liUh"
      },
      {
          "zonaDepilacion": "Piernas enteras + Cavado completo",
          "visibilidad": "ACTIVO",
          "timestamp": {
              "seconds": 1682387118,
              "nanoseconds": 34000000
          },
          "descripcion": "Paso a paso, has imaginado tus piernas perfectas y la zona íntima sin vellos? Paga por sesión!\nCon esta promo tienes Piernas enteras + Cavado completo y te regalamos Axilas!\n---\nPagas por cada sesión $ 4.850",
          "name": "Promo 1 🥰",
          "duracionCita": 30,
          "indiceJerarquia": 0,
          "stock": 100000,
          "price": "4850",
          "categoryId": "PROMOCIONES",
          "img": [
              "https://draconsoftware.com/storage/files/uhOHPgJSPvEbAkmuTNcG5zbcXaEm8I7ZHxmhjKnE.png"
          ],
          "relevancia": "1",
          "id": "wk9uZ5GI2WKuQ5GzTqTw"
      },
      {
          "stock": 100000,
          "name": "Promo 2",
          "visibilidad": "ACTIVO",
          "duracionCita": 30,
          "categoryId": "PROMOCIONES",
          "timestamp": {
              "seconds": 1682553928,
              "nanoseconds": 720000000
          },
          "price": "1950",
          "indiceJerarquia": 0,
          "zonaDepilacion": "Promo amigas (por sesión)",
          "img": [
              "https://draconsoftware.com/storage/files/gR98VUXgr0TRvBIsOjILKEMirjJupi3NYSLFA1Zv.jpg"
          ],
          "relevancia": "2",
          "descripcion": "Las buenas noticias tenemos que compartirlas! invita a una amiga y se benefician ambas!\nCon esta promo vienen 2 amigas, se hacen Cavado completo y les regalamos las Axilas.\n---\nPaga cada una $ 1.950 cada sesión",
          "id": "cdpazbg2cHHfemFkLkJ7"
      },
      {
          "categoryId": "PROMOCIONES",
          "zonaDepilacion": "Rostro completo (pack por 6 sesiones)",
          "img": [
              "https://draconsoftware.com/storage/files/x8PAs0HEpdihBNPh8yWJAXyTY3SP0EHMGSYLVYfG.jpg"
          ],
          "stock": 100000,
          "price": "8400",
          "duracionCita": 30,
          "timestamp": {
              "seconds": 1682554143,
              "nanoseconds": 614000000
          },
          "relevancia": "4",
          "visibilidad": "ACTIVO",
          "descripcion": "Cuanto cambia tu vida si eliminas definitivamente el vello de tu rostro? \nPack de 6! sesiones para  Rostro completo.\n---\nPagas las 6 sesiones efectivo o con cualquier tarjeta de crédito tienes un 20% de descuento\nPrecio total: $ 8.400 o con tarjeta de crédito puedes pagar hasta en 12 cuotas de $ 700 😉",
          "indiceJerarquia": 0,
          "name": "Promo 4",
          "id": "vvUoPANQvbGCeSqGB00z"
      },
      {
          "duracionCita": 30,
          "stock": 100000,
          "zonaDepilacion": "Piernas + Cavado + Axilas ",
          "categoryId": "PROMOCIONES",
          "price": "23280",
          "visibilidad": "ACTIVO",
          "timestamp": {
              "seconds": 1682597066,
              "nanoseconds": 569000000
          },
          "img": [
              "https://draconsoftware.com/storage/files/Lw0cmVWseGxf6ZQSZ8OxDByDqZ5XBVzdwd3thZhH.jpg"
          ],
          "descripcion": "maginas tus piernas perfectas y la comodidad de toda tu zona íntima sin vellos. \nPack de 6! sesiones para Piernas enteras + Cavado completo y Axilas de regalo\n---\nPagas las 6 sesiones en efectivo o con cualquier tarjeta de crédito y tienes un 20% de descuento\nPrecio total $ 23.280 y con tarjeta de crédito puedes pagar hasta en 12 cuotas de $ 1.940 😉",
          "relevancia": "5",
          "name": "Promo 5",
          "indiceJerarquia": 0,
          "id": "fSzkI4vcowjWqBrbfDfE"
      },
      {
          "name": "Promo 6",
          "categoryId": "PROMOCIONES",
          "duracionCita": 30,
          "relevancia": "6",
          "timestamp": {
              "seconds": 1682597159,
              "nanoseconds": 969000000
          },
          "visibilidad": "ACTIVO",
          "img": [
              "https://draconsoftware.com/storage/files/C14TKLjU6aVKBOxKHcRJXov4Fo4P8KJGKEVjwTlo.jpg"
          ],
          "descripcion": "Con el pack de 6! sesiones eliminas definitivamente el vello en toda la zona íntima. Promo Cavado completo.\n---\nPagas las 6 sesiones en efectivo o con cualquier tarjeta de crédito y tienes un 20% de descuento\nPrecio total: $ 9.360 que lo puedes pagar con tu tarjeta de crédito hasta en 12 cuotas de $ 780 😉",
          "zonaDepilacion": "Cavado total (pack 6 sesiones)",
          "stock": 100000,
          "price": "9360",
          "indiceJerarquia": 0,
          "id": "4BunDNo8bMUGGRSUOmw7"
      },
      {
          "duracionCita": 30,
          "visibilidad": "ACTIVO",
          "indiceJerarquia": 0,
          "stock": 100000,
          "categoryId": "PROMOCIONES",
          "relevancia": "7",
          "zonaDepilacion": "Todo el cuerpo!",
          "descripcion": "Conoces el significado de la palabra Libertad? \nElimina definitivamente el vello en todo tu cuerpo con nuestra promo pack de 6! sesiones para Cuerpo entero\n----------\nPagas las 6 sesiones en efectivo o con cualquier tarjeta de crédito y tienes un 20% de descuento\nPrecio total $ 34.080 que lo puedes pagar con tu tarjeta de crédito hasta en 12 cuotas de $ 2.840 😉",
          "name": "Promo 7",
          "timestamp": {
              "seconds": 1682601779,
              "nanoseconds": 70000000
          },
          "price": "34080",
          "img": [
              "https://draconsoftware.com/storage/files/DrFsneCkTYLTernF2pK2RLY1rgFWF6g3sdkCP4GP.jpg"
          ],
          "id": "KDN0iLOsByXfyOuS9DJB"
      }
  ]