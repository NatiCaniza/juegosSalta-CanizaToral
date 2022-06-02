//El usuario ingresa su nombre que es utilizado para darle la bienvenida
let usuario = prompt('Por favor, ingrese su nombre').toUpperCase()
alert('Bienvenido/a ' + usuario + ' a El Mundo del Juguete')

//Funcion constructora de los objetos Juego
class Juego {
    constructor(nombre, precio) {
        this.nombre = nombre
        this.precio = precio
    }
}

//Objetos creados con la funcion constructora
const juego1 = new Juego ('LIFE: El juego de la vida', 4750)
const juego2 = new Juego ('Monopoly', 5390)
const juego3 = new Juego ('Realidad Aumentada', 3450)
const juego4 = new Juego ('Juego de la Memoria', 1890)
const juego5 = new Juego ('Jenga Plástico', 1890)
const juego6 = new Juego ('Cuatro en Línea', 1890)
const juego7 = new Juego ('Letras 3D', 1990)
const juego8 = new Juego ('Batalla Naval', 1650)
const juego9 = new Juego ('Crisis: El mundo en juego', 5450)

//Array de los objetos utilizados para agregarlos al carrito
const listaJuegos = [juego1, juego2, juego3, juego4, juego5, juego6, juego7, juego8, juego9]

//Array donde se agregan el o los juegos que el usuario selecciona
let carrito = []

//Funcion para armar el mensaje donde el usuario elige el o los juegos que va a comprar
function armarMensaje(array) {
    let mensaje = 'Indique con el número correspondiente el producto que desea comprar:'
    let numero = 1

    for( let i = 0; i <= array.length-1; i++) {
        mensaje += '\n' + numero + '- ' + array[i].nombre + ' $' + array[i].precio;
        numero++;
    }
    return mensaje
}

//Funcion para mostrarle al usuario el listado de los juegos que estan en el carrito y que decida si comprar o no
const juegosCarrito = () => {
    let listaCarrito = ''
    carrito.forEach((elemento) => {
        listaCarrito += '\n' + '- ' + elemento.nombre;
    })
    return listaCarrito
}

// Funcion para calcular costo total del o los juegos seleccionados
function sumaCarrito() {
    let sumaTotal = 0
    carrito.forEach((elemento) => {
        sumaTotal += elemento.precio
    })
    return sumaTotal
}

//Variable y funcion creadas para que el usuario vea el primer juego que agregó al carrito y posteriormente pueda elegir si quiere agregar otro juego o no
let juegoSeleccionado

function seleccionUsuario(producto, precio) {
    juegoSeleccionado = producto
    alert(usuario + ' usted seleccionó: ' + producto + ' a $' + precio)
}

//Funcion que utilizo para agregar juegos al carrito
const agregarJuego = () => {
    let mensajeUsuario = armarMensaje(listaJuegos)
    let numeroJuego = Number((prompt(mensajeUsuario)))
    seleccionUsuario(listaJuegos[numeroJuego-1].nombre, listaJuegos[numeroJuego-1].precio)
    carrito.push(listaJuegos.splice(numeroJuego-1,1)[0])
}

agregarJuego()

//Sirve para que el usuario pueda decidir si agrega otro juego a su compra
while (confirm ('Desea agregar otro juego?')) {
    agregarJuego()
} 
//Si el usuario no agrega otro juego le muestra solo el juego que selecciono junto con el precio total de la compra y pregunta si quiere comprar o no, dando como respuesta dos mensajes diferentes segun la eleccion que haga el usuario
if (carrito.length === 1) {
    if (confirm('Desea completar su compra de ' + juegoSeleccionado + '?')) {
        alert('Su total es de: $' + sumaCarrito() +
            '\n Gracias por su compra!')
    } else {
        alert('Gracias por su visita!')
    }
} else {
    if (confirm ('Desea completar su compra de los siguientes juegos:' + juegosCarrito())) {
        alert('Total de la compra: $' + sumaCarrito() + 
        '\n Gracias por su compra!')
    } else {
        alert('Gracias por su visita!')
    }
}  //Si el usuario agrega mas de un juego al carrito, le muestra un listado con los juegos seleccionados junto con el precio total de la compra y pregunta si quiere comprar o no, dando como respuesta dos mensajes diferentes segun la eleccion que haga el usuario









