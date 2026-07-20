let carrito = [];

function comprar(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");

    lista.innerHTML = "";

    let suma = 0;

    carrito.forEach(producto => {
        let li = document.createElement("li");
        li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        lista.appendChild(li);
        suma += producto.precio;
    });

    total.textContent = suma.toFixed(2);
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let mensaje = "🛍️ Pedido Makeup Store\n\n";

    carrito.forEach(producto => {
        mensaje += `${producto.nombre} - $${producto.precio.toFixed(2)}\n`;
    });

    const total = carrito.reduce((a, b) => a + b.precio, 0);

    mensaje += `\nTotal: $${total.toFixed(2)}`;

    window.open(`https://wa.me/593960295650?text=${encodeURIComponent(mensaje)}`, "_blank");
}
