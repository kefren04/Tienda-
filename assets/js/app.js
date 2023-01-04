// Variables
let carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const nums_productos = document.querySelector('#nums_productos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un producto presionando "Agregar al Carrito"
    listaProductos.addEventListener('click', agregarProducto);

    //Elimina producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Muestra los productos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = localStorage.clear(); // reseteamos el arreglo
        console.log("articulosCarrito");
        console.log(articulosCarrito);
        articulosCarrito = [];
        console.log(articulosCarrito);
     
        window.location = "products.html";
        limpiarHTML(); // Eliminamos todo el Html
    })
}
console.log(carrito)

//Funciones
function agregarProducto(e){
    e.preventDefault();

    console.log("click")
    if ( e.target.classList.contains('agregar-carrito') ) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
    
}

// Elimina un producto del carrito
function eliminarProducto(e) {
    if(e.target.classList.contains('borrar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        
        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId );

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}


//Lee el contenido del Html al que le dimos Click y extrae la información del producto
function leerDatosProducto(producto) {
    //console.log(producto);
    
    // Crear un objeto con el contenido del producto actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent, 
        precio: producto.querySelector('.precio span').textContent, 
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    console.log(infoProducto);

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( producto => producto.id === infoProducto.id );
    if(existe) {
        // Actualizamos la cantidad
        const productos = articulosCarrito.map( producto => {
            if( producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // retorna el objeto actualizado
            } else {
                return producto; // Retorna los objetos que no son los duplicados
            }
        } );
        articulosCarrito = [...productos];
    } else {
        // Agregamos el producto al carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }


    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el Carrito de compras en el Html
function carritoHTML() {

    // limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    cantidadtotal = 0;
    
    articulosCarrito.forEach( producto => {
        console.log(producto);
        const { imagen, titulo, precio, cantidad, id} = producto; 
        // console.log(`La cantidad individual es de ${cantidad}`);
        
        const row = document.createElement('tr');


        //console.log(cart);
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
        nums_productos.textContent = `
            
        `;
        // console.log(imagen)

        //Agrega el Html del Carrito en el tbody
        contenedorCarrito.appendChild(row);

             cantidadtotal = cantidadtotal + 1;
    });
    
    //const add_productos = document.createElement('div');

    nums_productos.textContent = `
        ${cantidadtotal}
    `;
    console.log(`La cantidad total es  ${cantidadtotal} `)

    // cantidadtotal = 0;
    //nums_productos.appendChild(add_productos);


    //Agregar el carrito de compras al storage
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito)); 
}

// Elimina los productos del tbody
function limpiarHTML () {
    // Forma lenta
    // ontenedorCarrito.innerHTML = '';
    
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}