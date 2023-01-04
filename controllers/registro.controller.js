import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nombre = document.querySelector("[data-nombre]").value;
  const description = document.querySelector("[data-description]").value;
  const precio = document.querySelector("[data-precio]").value;
  let stars = document.querySelector("[data-stars]").value;
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
  
  const photo = document.querySelector("[data-photo]").value;
  const regex = /[A-Z]:\\fakepath\\/;
  const url = "../assets/img/products/";
  const photo_edit = photo.replace(regex, url)

  clientServices
    .crearCliente(nombre, description, precio, stars, photo_edit)
    .then(() => {
      window.location.href = "/screens/registro_completado.html";
    })
    .catch((err) => console.log(err));
});
