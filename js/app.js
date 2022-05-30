let usuario = prompt('Por favor, ingrese su nombre').toUpperCase()
alert('Bienvenido/a ' + usuario + ' a El Mundo del Juguete')

class Juego {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = precio
    }
}

const juego1 = new Juego ('Juego de mesa "LIFE: El juego de la vida"', 4750)
const juego2 = new Juego ('Juego de mesa "Monopoly"', 5390)
const juego3 = new Juego ('Juego de mesa "Preguntados Realidad Aumentada"', 3450)
const juego4 = new Juego ('Juego de mesa "Juego de la Memoria"', 1890)
const juego5 = new Juego ('Juego de mesa "Jenga Plástico"', 1890)
const juego6 = new Juego ('Juego de mesa "Cuatro en Línea"', 1890)
const juego7 = new Juego ('Juego de mesa "Letras 3D"', 1990)
const juego8 = new Juego ('Juego de mesa "Batalla Naval"', 1650)
const juego9 = new Juego ('Juego de mesa "Crisis: El mundo en juego"', 5450)

const listaJuegos = [juego1, juego2, juego3, juego4, juego5, juego6, juego7, juego8, juego9]

function armarMensaje(array) {
    let mensaje = 'Indique con el número correspondiente el producto que desea comprar:'
    let numero = 1

    for( let i = 0; i <= array.length-1; i++) {
        mensaje += '\n' + numero + '- ' + array[i].nombre + ' $' + array[i].precio;
        numero++;
    }
    return mensaje
}

let mensajeUsuario = armarMensaje(listaJuegos)
let numeroJuego = Number((prompt(mensajeUsuario)))
let juegoSeleccionado

function carrito(producto, precio) {
    juegoSeleccionado = producto
    alert(usuario + ' usted seleccionó: ' + producto + ' a $' + precio)
}

carrito(listaJuegos[numeroJuego-1].nombre, listaJuegos[numeroJuego-1].precio)

const compra = prompt('Desea completar su compra de ' + juegoSeleccionado + ' Si/No').toLowerCase()

if (compra === 'si') {
    alert('Gracias por su compra!')
} else {
    alert('Gracias por su visita!')
}






