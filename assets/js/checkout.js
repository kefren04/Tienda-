let carrito = document.querySelector('#checkout');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


let articulosCarrito = JSON.parse(localStorage.getItem('carrito'));

console.log(articulosCarrito);


const contenedorCarrito = document.querySelector('#lista-carrito tbody');


cargarEventListeners();
function cargarEventListeners(){
    carrito.addEventListener('click', eliminarCurso);
    carritoHTML() 

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = localStorage.clear(); // reseteamos el arreglo
        // console.log("articulosCarrito");
        // console.log(articulosCarrito);
        // articulosCarrito = [];
        // console.log(articulosCarrito);
     
        window.location = "products.html";
        // limpiarHTML(); // Eliminamos todo el Html
    })
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

function carritoHTML() {
        // limpiar el HTML
        limpiarHTML();
    
    precioTotal = 0;
    cantidadTotal = 0;

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso; 
        
        let precioLimpio = precio.slice(1)
        precioTotal = precioTotal + (cantidad * parseInt(precioLimpio));
        cantidadTotal = cantidadTotal + cantidad;


        const row = document.createElement('tr');


        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a hred="#" class="borrar-producto" data-id="${id}"> X </a></td>
        `;
        //const add_productos = document.createElement('div');
        
        // console.log(imagen)
        
        //Agrega el Html del Carrito en el tbody
        contenedorCarrito.appendChild(row);
        
        
    });

const row2 = document.createElement('tr');

row2.innerHTML = `
    <td>
    
    </td>
    <td>Precio Total</td>
    <td>$${precioTotal}</td>
    <td>${cantidadTotal}</td>
    <td><button hred="#" class="btn btn-success rounded-0 d-block m-0" data-id=""> Confirmar </button></td>
`;
contenedorCarrito.appendChild(row2);
}

// Elimina los cursos del tbody
function limpiarHTML () {
    // Forma lenta
    // ontenedorCarrito.innerHTML = '';
    
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}