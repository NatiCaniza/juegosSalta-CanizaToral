//Funcion constructora de los objetos Juego
class Juego {
    constructor(nombre, precio, imgSrc) {
        this.nombre = nombre
        this.precio = precio
        this.imgSrc = imgSrc
    }
}

// Desestructuracion de Objeto
const { nombre, precio, imgSrc } = Juego

//Objetos creados con la funcion constructora
const juego1 = new Juego('El juego de la vida', 4750, 'img/lifeElJuegoDeLaVida.jpg')
const juego2 = new Juego('Monopoly Clásico', 5390, 'img/monopoly.jpg')
const juego3 = new Juego('Preguntados', 3450, 'img/preguntadosRealidadAumentada.jpg')
const juego4 = new Juego('El Juego de la Oca', 2500, 'img/elJuegoDeLaOca.jpg')
const juego5 = new Juego('Carrera de Mente', 4500, 'img/carreraDeMente.jpg')
const juego6 = new Juego('Cuatro en Línea', 1890, 'img/4enLinea.jpg')
const juego7 = new Juego('Letras 3D', 1990, 'img/letras3d.jpg')
const juego8 = new Juego('Batalla Naval', 1650, 'img/batallaNaval.jpg')
const juego9 = new Juego('TEG Clásico', 5450, 'img/tegClasico.jpg')

//Array de los objetos utilizados para agregarlos al carrito
const listaJuegos = [juego1, juego2, juego3, juego4, juego5, juego6, juego7, juego8, juego9]

//Array donde se agregan el o los juegos que el usuario selecciona
let carrito = []

//DOM
const cardContainer = document.querySelector('#cardContainer')

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

//Funcion para agregar juegos al carrito
const agregarJuego = (e) => {
    const juegoElegido = e.target.getAttribute('data-id')
    const elemento = listaJuegos.find((elemento) => elemento.nombre == juegoElegido)
    carrito.push(elemento)
    imprimirCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//Botones Agregar al Carrito
const botonesCompra = document.querySelectorAll('.btn-primary')
botonesCompra.forEach((botonCompra) => {
    botonCompra.addEventListener('click', agregarJuego)
})

const notificacionesCarrito = document.querySelectorAll('.btn-primary')
notificacionesCarrito.forEach((notificacionCarrito) =>{
    notificacionCarrito.addEventListener('click',() => {
        Toastify({
            text: "Juego agregado al carrito",
            duration: 3000,
        }).showToast();
    })
})


// Funcion para calcular costo total del o los juegos seleccionados
const sumaCarrito = () => {
    let sumaTotal = 0
    carrito.forEach((elemento) => {
        sumaTotal = sumaTotal + elemento.precio
    })
}

//Optimizacion con operador OR
let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || []

//Funcion para finalizar compra y vaciar el carrito
const compraryVaciar = () => {
    sumaCarrito()
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

const botonvaciarCarrito = document.querySelector('.botonvaciarCarrito')
botonvaciarCarrito.addEventListener('click', vaciarCarrito)
