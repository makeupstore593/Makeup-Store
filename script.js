import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
let carrito = [];

function agregarProducto(nombre, precio) {

    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}


function actualizarCarrito() {

    let lista = document.getElementById("lista-carrito");
    let total = document.getElementById("total");
    let contador = document.getElementById("contador");

    lista.innerHTML = "";

    let suma = 0;
    let cantidad = 0;


    carrito.forEach((producto, index) => {

        suma += producto.precio * producto.cantidad;
        cantidad += producto.cantidad;


        lista.innerHTML += `
        <div class="item-carrito">

        <b>${producto.nombre}</b><br>

        $${producto.precio.toFixed(2)}

        <br>

        <button onclick="cambiarCantidad(${index}, -1)">-</button>

        ${producto.cantidad}

        <button onclick="cambiarCantidad(${index}, 1)">+</button>

        <button onclick="eliminarProducto(${index})">
        🗑️
        </button>

        </div>
        `;

    });


    total.textContent = suma.toFixed(2);
    contador.textContent = cantidad;

}


function cambiarCantidad(index, cambio){

    carrito[index].cantidad += cambio;

    if(carrito[index].cantidad <= 0){
        carrito.splice(index,1);
    }

    actualizarCarrito();

}


function eliminarProducto(index){

    carrito.splice(index,1);

    actualizarCarrito();

}


function mostrarCarrito(){

    document.getElementById("carrito")
    .classList.add("activo");

}


function cerrarCarrito(){

    document.getElementById("carrito")
    .classList.remove("activo");

}



function enviarWhatsApp(){

    if(carrito.length === 0){

        alert("Tu carrito está vacío");
        return;

    }


    let mensaje = "💄 Pedido Makeup Store\n\n";


    carrito.forEach(producto => {

        mensaje += `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}\n`;

    });


    let total = carrito.reduce(
        (suma, producto) =>
        suma + producto.precio * producto.cantidad,
        0
    );


    mensaje += `\n💰 Total: $${total.toFixed(2)}`;


    window.open(
        "https://wa.me/593960295650?text=" +
        encodeURIComponent(mensaje),
        "_blank"
    );

}
async function cargarProductos() {

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    const consulta = await getDocs(collection(db, "productos"));

    consulta.forEach((doc) => {

        const producto = doc.data();

        contenedor.innerHTML += `
        <div class="producto">
            <img src="${producto.Imagen}" alt="${producto.Nombre}">
            <div class="info-producto">
                <h2>${producto.Nombre}</h2>
                <p>${producto.Descripcion}</p>
                <p class="precio">$${producto.Precio}</p>

                <button onclick="agregarProducto('${producto.Nombre}', ${producto.Precio})">
                    Agregar al carrito 🛒
                </button>
            </div>
        </div>
        `;
    });

}

cargarProductos();
window.agregarProducto = agregarProducto;
window.cambiarCantidad = cambiarCantidad;
window.eliminarProducto = eliminarProducto;
window.mostrarCarrito = mostrarCarrito;
window.cerrarCarrito = cerrarCarrito;
window.enviarWhatsApp = enviarWhatsApp;