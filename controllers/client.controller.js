import { clientServices } from "../service/client-service.js";

// Este es para products 
const lista_productsAdmin = (id, nombre, description, precio, stars, photo) => {
  const fila = document.createElement("tr");
  const contenido = `
    <td class="col-3" data-td>
      ${nombre}
    </td>
    <td class="col-3">${description}</td>
    <td class="col-2">${precio}</td>
    <td class="col-2"><img  class="photo_edit" src="${photo}"></td>
    <td class="col-2">
      <ul >

          <a
            href="../screens/editar_producto.html?id=${id}"
            class="btn btn-success rounded-0 d-block m-2"
          >
            Editar
          </a>

        <a class="btn btn-danger rounded-0 d-block m-2" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal${id}">
          Eliminarrr
        </a>
        

        <!-- Modal -->
        <div class="modal fade" id="exampleModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content p-3">
                <h2 class="d-flex justify-content-center">¿Eliminar?</h2>
                <p class="d-flex justify-content-center">La siguiente acción es irreversible</p>
                <button class="btn btn-danger rounded-0 d-block m-2 " id="${id}" type= "button" >
                    Eliminar
                </button>
              </div>
    
          </div>
        </div>

      </ul>
      
    </td>

  `;
  fila.innerHTML = contenido;
  const btn = fila.querySelector("button");

  btn.addEventListener("click", () => {
    const nuevo = btn.id;   
    clientServices
      .eliminarCliente(nuevo)
      .then((respuesta) => {
        console.log(`RESPUESTA: ${respuesta}`);
      })
      .catch((err) => console.log("ERROR DE RESPUESTA DE LISTA ADMIN"));
  });

  return fila;
};


// Este es para lista_products
const crearNuevaLinea = (id, nombre, description, precio, stars, photo) => {
  const linea = document.createElement("div");
  linea.setAttribute("class", "card col-12 col-sm-4 unico")	
  const contenido = `
        <div class="card-body">
            <img src="${photo}" class="imagen-curso u-full-width">
            <div class="info-card">
                <h4>${nombre}</h4>
                <p>${description}</p>
                <img src="${stars}">
                <p class="precio"><span class="resalta">$${precio}</span></p>
                <a href="#" class="btn btn-success rounded-0 d-block m-2 input agregar-carrito" data-id="${id}">Comprar</a>
            </div>
        </div>  
  `;
  linea.innerHTML = contenido;

  return linea;
};

const grid = document.getElementById("products_view");

const list_admin = document.querySelector("[data-body]");

clientServices
  .listarProductos()
  .then((data) => {
    data.forEach(({ id, nombre, description, precio, stars, photo }) => {
      const products = crearNuevaLinea(id, nombre, description, precio, stars, photo);
      // console.log(products)  
      grid.appendChild(products);
    });
  })
  .catch((error) => console.log(`error1 ${error}`));

clientServices
  .listarProductosAdmin()
  .then((data) => {
    data.forEach(({ id, nombre, description, precio, stars, photo }) => {
      const lista_delAdmin = lista_productsAdmin(id, nombre, description, precio, stars, photo);
      // console.log(lista_delAdmin)
      // console.log(list_admin)

      list_admin.appendChild(lista_delAdmin);
    });
  })
  .catch((error) => console.log(`error2 ${error}`));
