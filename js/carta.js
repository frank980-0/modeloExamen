export class Carta {
  constructor(id, nombre, urlImagen, precio, urlScryFall) {
    // validaciones
    if (id == null || typeof id != "number") {
      throw new Error("El ID no puede estar vacio y tiene que ser entero");
    }
    if (urlScryFall == null || typeof urlScryFall != "string") {
      throw new Error(
        "La URL no tiene que estar vacio y tiene que ser una cadena de texto",
      );
    }
    if (nombre == null || typeof nombre != "string") {
      throw new Error("El nombre no puede estar vacio y tiene que ser entero");
    }
    if (urlImagen == null || typeof urlImagen != "string") {
      throw new Error(
        "La URL no puede estar vacias y tiene que ser una cadena de texto",
      );
    }
    if (precio < 0 || typeof precio != "number") {
      throw new Error(
        "El precio no puede ser negativo y tiene que ser un entero",
      );
    }

    this.id = id;
    this.nombre = nombre;
    this.urlImagen = urlImagen;
    this.precio = precio;
    this.urlScryFall = urlScryFall;
  }

  // metodos
  toJsonString() {
    return JSON.stringify(this); // devuelve un json no un objeto tipo lista
  }

  static createFromJsonString(json) {
    const datos = JSON.parse(json); //devuelve un objeto de tipo lista
    return new Carta(
      Number(datos.id),
      datos.nombre,
      datos.urlImagen,
      Number(datos.precio), //castear a numero
      datos.urlScryFall,
    );
  }

  static guardarCarta(carta) {
    const cartasGuardadas =
      JSON.parse(localStorage.getItem("cartasGuardadas")) || [];
    cartasGuardadas.push(carta);
    localStorage.setItem("cartasGuardadas", JSON.stringify(cartasGuardadas)); //persistencia para que viva en el codigo
    console.log("las cartas fueron cargadas");
    console.log(cartasGuardadas);
  }

  createHtmlElement() {
    const div = document.createElement("div");
    div.className = "carta";
    div.style.maxWidth = "200px";

    const titulo = document.createElement("h3");
    titulo.textContent = this.nombre;

    const precio = document.createElement("p");
    precio.textContent = `Precio: $${this.precio.toFixed(2)}`;

    const img = document.createElement("img");
    img.src = this.urlImagen;
    img.alt = this.urlScryFall;
    img.style.maxWidth = "150px";

    const url = document.createElement("a");
    url.href = this.urlImagen; // hace refe a una url
    url.alt = this.nombre;
    url.target = "_blank"; // abre una nueva ventana
    url.appendChild(img);
    // cambio: .appendChild solo acepta un nodo por parametro
    div.appendChild(titulo);
    div.appendChild(precio);
    div.appendChild(url);

    const botonGuardar = document.createElement("button");
    botonGuardar.textContent = "Guardar";
    botonGuardar.onclick = () => Carta.guardarCarta(this);
    div.appendChild(botonGuardar);

    return div;
  }
}
