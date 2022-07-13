const nombre= document.querySelector("#inputNombre")
const telefono= document.querySelector("#inputTelefono")
const email= document.querySelector("#inputEmail")
const btn= document.querySelector("#submit")
const direccion= document.querySelector("#inputDireccion")


btn.addEventListener("mousemove", ()=> {
    btn.title = "Complete los datos antes de ENVIAR"
})

document.addEventListener("submit", (e)=> {
    e.preventDefault()
    guardarDatosDeUsr()
    Swal.fire({
        icon: 'success',
        title: 'Hecho!',
        text: 'Formulario Enviado!',
    })
})

function guardarDatosDeUsr() {
    
    const datosDeUsr = {nombre: nombre.value,
                        telefono: telefono.value,
                        email: email.value,
                        direccion: direccion.value
    } 
    let str = JSON.stringify(datosDeUsr)
    localStorage.setItem("datosDeUsr", str)
}

function recuperoDatosDeUsr() {
    if (miCarrito = JSON.parse(localStorage.getItem("carrito"))) {
        if (localStorage.getItem("datosDeUsr")) {
            const datosDeUsr = JSON.parse(localStorage.getItem("datosDeUsr"))
                  nombre.value = datosDeUsr.nombre
                  telefono.value = datosDeUsr.telefono
                  email.value  = datosDeUsr.email
                  direccion.value = datosDeUsr.direccion
        }    
    }
}
recuperoDatosDeUsr()