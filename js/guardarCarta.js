import { Carta } from "./carta.js";

function GuardadosHTML() {
  const datos = localStorage.getItem("cartasGuardadas");
  const contenedor = document.getElementById("contenedorCartas");
  console.log(datos);
  console.log(contenedor);

  const cartas = JSON.parse(datos);

  cartas.forEach((carta) => {
    const cartaInstanciada = new Carta(
      carta.id,
      carta.nombre,
      carta.urlImagen,
      Number(carta.precio),
      carta.urlScryFall,
    );
    const htmlCarta = cartaInstanciada.createHtmlElement();
    contenedor.appendChild(htmlCarta);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  GuardadosHTML();
});

// ordenamiento
