//Array de los objetos utilizados para agregarlos al carrito
let listaJuegos

//Array donde se agregan el o los juegos que el usuario selecciona
let carrito = []

let totalDeCompra = 0

//DOM
const cardContainer = document.querySelector('#cardContainer')

const renderizarJuegos = (listaJuegos) => {
    cardContainer.innerHTML= ''
    listaJuegos.forEach((elemento) => {
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
    botonCompra.addEventListener('click',() => {
        Toastify({
            text: "Juego agregado al carrito",
            duration: 3000,
        }).showToast();
    })
})
}

const miCarrito = document.querySelector('#miCarrito')

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

const agregarJuego = (e) => {
    const juegoElegido = e.target.getAttribute('data-id')
    const elemento = listaJuegos.find((elemento) => elemento.nombre == juegoElegido)
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

//Optimizacion con operador OR
let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || []

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
        text:'El precio total de la compra es de $' + totalDeCompra,
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

// Traemos los productos desde JSON
const cargarListaJuego = async () => {
    const res = await fetch('./data/productos.json')
    const json = await res.json()
    listaJuegos = json.data
    renderizarJuegos(listaJuegos)
    
}

cargarListaJuego()


