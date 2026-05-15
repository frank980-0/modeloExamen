import { Carta } from "./carta.js";

// Tu función original, pero le agregamos el parámetro 'criterio' (opcional)
function GuardadosHTML(criterio = null) {
  const datos = localStorage.getItem("cartasGuardadas");
  const contenedor = document.getElementById("contenedorCartas");

  // LIMPIEZA: Siempre vaciamos el contenedor antes de cargar
  contenedor.innerHTML = "";
  if (!datos) return;

  let cartas = JSON.parse(datos);

  // ORDENAMIENTO: Si recibimos un criterio, ordenamos el array
  if (criterio === "nombre") {
    cartas.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (criterio === "precio") {
    cartas.sort((a, b) => a.precio - b.precio);
  }

  // RENDERIZADO: Igual que lo tenías
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

// EVENTOS: Asignamos la lógica a los botones cuando carga la página
document.addEventListener("DOMContentLoaded", () => {
  GuardadosHTML(); // Carga inicial sin orden específico

  document.getElementById("btnOrdenNombre").addEventListener("click", () => {
    GuardadosHTML("nombre");
  });

  document.getElementById("ordenarMenor").addEventListener("click", () => {
    GuardadosHTML("precio");
  });
});

// forma complicada

// import { Carta } from "./carta.js";

// function mostrarCartas(arrayCartas) {
//   const contenedor = document.getElementById("contenedorCartas");
//   contenedor.innerHTML = ""; //limpiar

//   arrayCartas.forEach((cartaJson) => {
//     const carta = new Carta(
//       Number(cartaJson.id),
//       cartaJson.nombre,
//       cartaJson.urlImagen,
//       Number(cartaJson.precio),
//       cartaJson.urlScryFall,
//     );
//     contenedor.appendChild(carta.createHtmlElement());
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const cartasGuardadas = JSON.parse(localStorage.getItem("cartasGuardadas"));
//   mostrarCartas(cartasGuardadas);

//   console.log(cartasGuardadas);

//   // ordenamiento
//   document.getElementById("ordenarMayor").addEventListener("click", () => {
//     const cartasMayor = [...cartasGuardadas].sort(
//       (a, b) => b.precio - a.precio,
//     );
//     mostrarCartas(cartasMayor);
//     console.log(cartasMayor);
//   });

//   document.getElementById("ordenarMenor").addEventListener("click", () => {
//     const cartasMenor = [...cartasGuardadas].sort(
//       (a, b) => a.precio - b.precio,
//     );
//     mostrarCartas(cartasMenor);
//   });
// });
