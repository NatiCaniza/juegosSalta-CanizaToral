// ------- DECLARACIONES -------
//Array de los objetos utilizados para agregarlos al carrito
let listaJuegos

//Array donde se agregan el o los juegos que el usuario selecciona
let carrito = []
//Array que utilizo en la funcion para finalizar compra y vaciar el carrito
let totalDeCompra = 0

//Optimizacion con operador OR
let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || []

// ------- QUERY ELEMENTOS -------
//Barra de busqueda
const barraBusqueda = document.querySelector('#barraBusqueda')
const botonBusqueda = document.querySelector('#botonBusqueda')

//Card container
const cardContainer = document.querySelector('#cardContainer')

//Carrito
const miCarrito = document.querySelector('#miCarrito')

//Input y boton para suscribirse
const barraMail = document.querySelector('#barraMail')
const botonMail = document.querySelector('#botonMail')

// ------- FUNCIONES -------
const renderizarJuegos = (array) => {
    cardContainer.innerHTML = ''
    array.forEach((elemento) => {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
        <img src="${elemento.imgSrc}" class="card-img-top">
        <h2 class="card-title">${elemento.nombre}</h2>
        <p class="card-text">$${elemento.precio}</p>
        <button data-id="${elemento.nombre}"class="btn btn-primary"> Agregar al Carrito </button>
        `
        cardContainer.append(card)
    })

//Boton Agregar al Carrito que tambien genera una notificacion
const botonesCompra = document.querySelectorAll('.btn-primary')
botonesCompra.forEach((botonCompra) => {
    botonCompra.addEventListener('click', agregarJuego)
    botonCompra.addEventListener('click', () => {
        Toastify({
            text: "Juego agregado al carrito",
            duration: 3000,
        }).showToast();
    })
})
}

// Funcion para imprimir el carrito carrito
const imprimirCarrito = () => {
    miCarrito.innerHTML = ''
    carrito.forEach((elemento) => {
        const filaCarrito = document.createElement('div')
        filaCarrito.className = 'filaCarrito'
        filaCarrito.innerHTML = `
        <div class="imagenCarrito">
        <img src="${elemento.imgSrc}">
        </div>
        <div class="tituloJuegoCarrito"><span> Juego ${elemento.nombre}</span></div>
        <div class="precioJuegoCarrito"><span> $${elemento.precio}</span></div>
        `
        miCarrito.append(filaCarrito)
    })
}

// Funcion para agregar juegos al carrito
const buscarJuegosEnArrayPorId = (nombreJuegoSeleccionado) => listaJuegos.find((elemento) => elemento.nombre == nombreJuegoSeleccionado)
const agregarJuego = (e) => {
    const juegoElegido = e.target.getAttribute('data-id')
    const elemento = buscarJuegosEnArrayPorId(juegoElegido)
    carrito.push(elemento)
    imprimirCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Funcion para calcular costo total del o los juegos seleccionados
const sumaCarrito = () => {
    let sumaTotal = 0
    carrito.forEach((elemento) => {
        sumaTotal = sumaTotal + elemento.precio
    })
    return sumaTotal
}

//Funcion para finalizar compra y vaciar el carrito
const compraryVaciar = () => {
    totalDeCompra = sumaCarrito()
    vaciarCarrito()
}

//Boton Finalizar Compra
const finalizarCompra = document.querySelectorAll('.finalizarCompra')
finalizarCompra.forEach((botonFinalizar) => {
    botonFinalizar.addEventListener('click', compraryVaciar)
})

document.querySelector('.finalizarCompra').addEventListener('click', () => {
    Swal.fire({
        title: 'Gracias por su compra!',
        text: 'El precio total de la compra es de $' + totalDeCompra,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
})

//Funciones para vaciar carrito y localStorage
const vaciarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        localStorage.removeItem('carrito')
    }
    carrito = []
    imprimirCarrito()
}

//Funcion que genera una alerta cuando se quiere borrar el carrito
const botonvaciarCarrito = document.querySelector('.botonvaciarCarrito')
botonvaciarCarrito.addEventListener('click', () => {
    Swal.fire({
        title: 'Estás seguro que quieres borrar el carrito?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#06D6A0',
        cancelButtonColor: '#FFC43D',
        confirmButtonText: 'Si, borrar!'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito()
            Swal.fire(
                'Listo!',
                'Los productos fueron borrados con éxito',
                'success'
            )
        }
    })
})

//Funcion que envia un mail con la direcciom de email que el usuario ingrese en el input
const enviarMail = () => {
    Email.send({
        Host : "smtp.elasticemail.com",
        Port: '2525',
        Username : "horadejugar.nct@gmail.com",
        Password : "A4BD5F7ED99B097024E1BBA365CCB101F456",
        To : "horadejugar.nct@gmail.com",
        From : document.getElementById('barraMail').value,
        Subject : "Nuevo Mail de Contacto",
        Body : "Mail: " + document.getElementById('barraMail').value,
    })
}

//Funcion que muestra una notificacion al hacer click en el boton Enviar
const botonEnviar = document.querySelector('#botonMail')
botonMail.addEventListener('click' , () => {
    Toastify({
        text: "Mail registrado con éxito!",
        duration: 3000,
    }).showToast();
    enviarMail();
})

// Barra y boton de busqueda
const busquedaJuegos = () => {
    const busquedaQuery = barraBusqueda.value.toLowerCase()
    const busquedaResultado = listaJuegos.filter((elemento) => elemento.nombre.toLowerCase().includes(busquedaQuery))
    renderizarJuegos(busquedaResultado)
}

// Traemos los productos desde JSON
const cargarListaJuego = async () => {
    const res = await fetch('./data/productos.json')
    const json = await res.json()
    listaJuegos = json.data
    renderizarJuegos(listaJuegos)

}

// ------- EVENT LISTENERS -------
// Barra de Busqueda
botonBusqueda.addEventListener('click', busquedaJuegos)
barraBusqueda.addEventListener('input', busquedaJuegos)

// ------- Traemos los Pokemon desde JSON -------
cargarListaJuego(listaJuegos)


