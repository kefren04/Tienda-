const listarProductos = () =>
  fetch("http://localhost:3000/products").then((respuesta) => respuesta.json());

const listarProductosAdmin = () =>
  fetch("http://localhost:3000/products").then((respuesta) => respuesta.json());

const crearCliente = (nombre, description, precio, stars, photo) => {
  return fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: uuid.v4(), nombre, description, precio, stars, photo }),
  });
};

const eliminarCliente = (id) => {
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
};

const detalleProducto = (id) => {
  return fetch(`http://localhost:3000/products/${id}`).then((respuesta) =>
    respuesta.json()
  );
};

const actualizarCliente = (nombre, description, precio, stars, photo, id) => {
  return fetch(`http://localhost:3000/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, description, precio, stars, photo }),
  })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};

export const clientServices = {
  listarProductos,
  listarProductosAdmin,
  crearCliente,
  eliminarCliente,
  detalleProducto,
  actualizarCliente,
};
