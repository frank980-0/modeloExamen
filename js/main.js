import { Carta } from "./carta.js";

let paginaActual = 1;
const totalDeCartas = 18;
const cartasPorPagina = 6;

async function cargarCartas(pagina) {
  const inicio = (pagina - 1) * cartasPorPagina + 1;
  const fin = inicio + cartasPorPagina - 1;

  const listaCarta = [];
  //   recorrer la lista de cartas hasta llegar a 6
  for (let i = inicio; i <= fin; i++) {
    listaCarta.push(
      // aca se forma una promesa q se tiene que cumplir
      fetch(`https://examenesutn.vercel.app/api/cartas/${i}`).then((res) => {
        // en caso que de error
        if (res.status != 200) {
          throw new Error(`No se cargo la carta ${i}`);
        }
        return res.json();
      }),
    );
  }
  try {
    const datosCarta = await Promise.all(listaCarta);
    const contenedor = document.getElementById("contenedorCartas");
    contenedor.innerHTML = "";
    // creamos las instancias
    const cartas = datosCarta.map((dato) => {
      return new Carta(
        Number(dato.id),
        dato.nombre,
        dato.urlImagen,
        Number(dato.precio), //castear a numero
        dato.urlScryFall,
      );
    });
    cartas.forEach((carta) => {
      const elemento = carta.createHtmlElement();
      document.getElementById("contenedorCartas").appendChild(elemento);
    });
  } catch (error) {
    alert("Ocurrio un error: " + error.message);
  }
}
function siguientePagina() {
  if (paginaActual * 6 < totalDeCartas) {
    paginaActual++;
    cargarCartas(paginaActual);
  } else {
    alert("esta es la ultima pagina");
  }
}

function paginaAnterior() {
  if (paginaActual > 1) {
    paginaActual--;
    cargarCartas(paginaActual);
  } else {
    alert("no podes retroceder mas de la 1ra pagina");
  }
}

document.getElementById("anterior").addEventListener("click", paginaAnterior);
document.getElementById("siguiente").addEventListener("click", siguientePagina);

cargarCartas(paginaActual);
