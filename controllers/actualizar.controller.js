import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInformacion = async () => {
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  if (id === null) {
    window.location.href = "/screens/error.html";
  }

  const nombre = document.querySelector("[data-nombre]");
  const description = document.querySelector("[data-description]");
  const precio = document.querySelector("[data-precio]");
  const stars = document.querySelector("[data-stars]");
  const photo = document.querySelector("[data-photo]");

  try {
    const producto = await clientServices.detalleProducto(id);
    if (producto.nombre && producto.description && producto.precio) {
      nombre.value = producto.nombre;
      description.value = producto.description;
      precio.value = producto.precio;
    } else {
      throw new Error();
    }
  } catch (error) {
    window.location.href = "/screens/error.html";
  }
};

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const url = new URL(window.location);
  const id = url.searchParams.get("id");

  const nombre = document.querySelector("[data-nombre]").value;
  const description = document.querySelector("[data-description]").value;
  const precio = document.querySelector("[data-precio]").value;
  let stars = document.querySelector("[data-stars]").value;
  const photo = document.querySelector("[data-photo]").value;

  switch (stars) {
    case "1-estrellas":
      stars = "../assets/img/1estrellas.png";
      console.log("1")
      break;
    
    case "2-estrellas":
      stars = "../assets/img/2estrellas.png";
      console.log("2")
      break;
    case "3-estrellas":
      stars = "../assets/img/3estrellas.png";
      console.log("3")
      break;
    case "4-estrellas":
      stars = "../assets/img/4estrellas.png";
      console.log("4")
      break;
    case "5-estrellas":
      stars = "../assets/img/5estrellas.png";
      console.log("5")
      break;
  
    default:
      break;
  }

  const regex = /[A-Z]:\\fakepath\\/;
  const url_edit = "../assets/img/products/";
  const photo_edit = photo.replace(regex, url_edit)
  
  clientServices.actualizarCliente(nombre, description, precio, stars, photo_edit, id).then(() => {
    window.location.href = "/screens/edicion_concluida.html";
  });
});
