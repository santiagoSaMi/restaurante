const url = 'https://script.google.com/macros/s/AKfycbzDYgeronKl-TpTprWj5G288Q3kaNszOCd1ADSHy1JTDheOd9AHo7gV7sN1kefRMrMK6w/exec';
const productos = [];
const carrito = [];
const total = 0;

window.addEventListener("load", () => {
    fetch(url)
    .then(response => response.json())
    .then(data => mostrarPlatos(data))
    .catch(error => console.error('Error: ', error));
});

function mostrarPlatos(platos) {
    const entradas = document.getElementById("entradas");
    const platosFuertes = document.getElementById("platos_fuertes");
    const bebidas = document.getElementById("bebidas");
    const postres = document.getElementById("postres");

    entradas.innerHTML = "";
    platosFuertes.innerHTML = "";
    bebidas.innerHTML = "";
    postres.innerHTML = "";
    platos.data.forEach((plato) => {
        productos.push(plato);
        const platoHtml = `
            <article class="plato">
                <img src="${plato.Imagen}" alt="${plato.Nombre}">
                <div>     
                    <h3 class="nombre">${plato.Nombre}</h3>
                    <p class="descripcion">${plato.Descripcion}</p>
                </div>
                <div>
                    <p class="precio">$ ${plato.Precio}</p>
                    <button class="agregar-carrito" onclick="agregarAlCarrito(${plato.ID})">Agregar al carrito</button>
                </div>
            </article>
        `;

        switch (plato.Categoria) {
            case "Entrada":
                entradas.innerHTML += platoHtml;
                break;
            case "Plato Principal":
                platosFuertes.innerHTML += platoHtml;
                break;
            case "Bebidas":
                bebidas.innerHTML += platoHtml;
                break;
            case "Postres":
                postres.innerHTML += platoHtml;
                break;
            default:
                console.error("La categoría no existe: " + plato.Categoria);
                break;
        }
    })
}


function agregarAlCarrito(id) {
    const plato = productos.find((plato) => plato.ID === id);
    carrito.push(plato);
    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const precioTotal = document.getElementById("total")
    listaCarrito.innerHTML = "";
    carrito.forEach((plato, index) => {
        const platoHtml = `
            <article class="plato">
                <img src="${plato.Imagen}" alt="${plato.Nombre}">
                <div>     
                    <h3 class="nombre">${plato.Nombre}</h3>
                    <p class="descripcion">${plato.Descripcion}</p>
                </div>
                <div>
                    <p class="precio">$ ${plato.Precio}</p>
                    <button class="agregar-carrito" onclick="eliminarPlato(${index})">Eliminar</button>
                </div>
            </article>`;
        listaCarrito.innerHTML += platoHtml;
    })
    precioTotal.innerHTML = `${obtenerTotal()}`;
}

function obtenerTotal(){
    var valor = 0;
    carrito.forEach((plato) => {
        valor += plato.Precio;
    })
    return valor;
}

function eliminarPlato(index){
    carrito.splice(index, 1);
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-carrito").addEventListener("submit", function(event) {
        event.preventDefault();
    
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const direccion = document.getElementById("direccion").value;
        const pedido = carrito.value;
        const totalPedido = total.value;
    
        const datosPedido = {
            nombre,
            telefono,
            direccion,
            pedido,
            totalPedido
        }
    
        enviarPedido(datosPedido);
    })
})


function tomarDatos() {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const pedido = carrito.value;
    const totalPedido = total.value;

    const datosPedido = {
        nombre,
        telefono,
        direccion,
        pedido,
        totalPedido
    }

    subirDatos(datosPedido);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-carrito").addEventListener("submit", function(event) {
        event.preventDefault();
    
        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const direccion = document.getElementById("direccion").value;
        const pedido = carrito.value;
        const totalPedido = total.value;
    
        const datosPedido = {
            nombre,
            telefono,
            direccion,
            pedido,
            totalPedido
        }
    
        subirDatos(datosPedido);
    })
})


