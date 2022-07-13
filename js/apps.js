const URL = `js/productos.json`

const obtengoContenido=(URL)=> {
    debugger
    fetch(URL)
    .then((response)=> response.json())
    .then((data)=> {
        mostrarProductos(data)
        productoss= data
    })
}

obtengoContenido(URL)

// variables


let carritoCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const selecColor = document.getElementById('selecColor')
const selecTalles = document.getElementById('selecTalles')

const buscar = document.getElementById('buscador-producto') //button
const prod = document.getElementById('producto-buscar') //input

// fin variables

//busqueda


const filtrar = () => {
    arrayBuscar= []
    console.log(prod.value)
    const texto = prod.value.toLowerCase();
    
    productoss.forEach(elemento => {
        let resul = elemento.nombre.toLowerCase();
    
    resul.indexOf(texto) !== -1 && arrayBuscar.push(elemento) // operador logico and
    
    mostrarProductos(arrayBuscar)
    })
}

buscar.addEventListener('click', filtrar)

//filtro
selecColor.addEventListener('change',()=>{

    let arrayNuevo = productoss.filter(elemento => elemento.color === selecColor.value)

    // operador ternario
    selecColor.value == 'all' ? mostrarProductos(productoss) :  mostrarProductos(arrayNuevo)
})

selecTalles.addEventListener('change',()=>{
    let arrayNuevo = productoss.filter(elemento => elemento.talle === selecTalles.value)
    
    //operador ternario
    selecTalles.value == 'all' ? mostrarProductos(productoss) : mostrarProductos(arrayNuevo)
})



function mostrarProductos(arra) {

    contenedorProductos.innerHTML = ""

    arra.forEach(element => {
    let div = document.createElement('div')
    div.className = 'productos'
    div.innerHTML = `
                    <img src="${element.imagen}" class="img_producto" alt="">
                    <div class="descrip_producto">
                        <p>${element.nombre}</p>
                        <p>Talle ${element.talle}</p>
                        <p> $ ${element.precio}</p>
                    </div>
                    <input id="boton${element.id}" class="btn btn-color btn-sm" type="button" value="Comprar"/>`
    
    contenedorProductos.appendChild(div)

    let btnAgregar = document.getElementById(`boton${element.id}`)
    btnAgregar.addEventListener('click', ()=> {
        agregarAlcarrito(element.id)
        Toastify({
            text: "Producto Agregado",
            duration: 3000,
            gravity: 'bottom',
            position: 'right',
            style: {
                color: "black",
                background: "rgb(235,192,167)",
                background: "linear-gradient(180deg, rgba(235,192,167,1) 16%, rgba(251,205,176,1) 40%, rgba(255,241,228,1) 58%)"
              }
        }).showToast();
    })
    });

}

function agregarAlcarrito(id) {
    let productoAgregar = productoss.find(el=> el.id === id)
    carritoCompras.push(productoAgregar)
    mostrarCarrito(productoAgregar)
    actualizarCarrito()
}

function mostrarCarrito(productoAgregar) {
    let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML= `<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)           

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click', ()=> {
        btnEliminar.parentElement.remove()
        carritoCompras = carritoCompras.filter(elemento => elemento.id !== productoAgregar.id)
        actualizarCarrito()
    })
}

function actualizarCarrito (){
    contadorCarrito.innerText = carritoCompras.length
    precioTotal.innerText = carritoCompras.reduce((acc,elem)=> acc + elem.precio,0)
}