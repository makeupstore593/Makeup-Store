let carrito = [];

function agregarProducto(nombre, precio){

    let productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if(productoExistente){
        productoExistente.cantidad++;
    }else{
        carrito.push({
            nombre:nombre,
            precio:precio,
            cantidad:1
        });
    }

    actualizarCarrito();
}


function actualizarCarrito(){

    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML="";

    let suma = 0;
    let cantidadTotal = 0;


    carrito.forEach((producto,index)=>{

        suma += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;


        let div = document.createElement("div");

        div.className="item-carrito";

        div.innerHTML=`

        <p>
        <b>${producto.nombre}</b>
        </p>

        <p>
        $${producto.precio.toFixed(2)}
        </p>

        <button onclick="cambiarCantidad(${index},-1)">
        -
        </button>

        ${producto.cantidad}

        <button onclick="cambiarCantidad(${index},1)">
        +
        </button>


        <button onclick="eliminarProducto(${index})">
        🗑️
        </button>

        `;

        lista.appendChild(div);

    });


    total.textContent=suma.toFixed(2);
    contador.textContent=cantidadTotal;

}



function cambiarCantidad(index, cambio){

    carrito[index].cantidad += cambio;


    if(carrito[index].cantidad <=0){

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

    if(carrito.length===0){

        alert("Tu carrito está vacío");

        return;
    }


    let mensaje="💄 Pedido Makeup Store\n\n";


    carrito.forEach(producto=>{

        mensaje += 
        `${producto.nombre} x${producto.cantidad} - $${(producto.precio*producto.cantidad).toFixed(2)}\n`;

    });


    let total=carrito.reduce(
        (suma,producto)=>
        suma+(producto.precio*producto.cantidad),
        0
    );


    mensaje += 
    `\n💰 Total: $${total.toFixed(2)}`;


    window.open(
    "https://wa.me/593960295650?text="
    +encodeURIComponent(mensaje),
    "_blank"
    );

}
