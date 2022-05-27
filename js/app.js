let usuario = prompt('Por favor, ingrese su nombre').toLowerCase()
alert('Bienvenido/a ' + usuario + ' a El Mundo del Juguete')

let juego = Number((prompt('Indique con el número correspondiente el producto que desea comprar: \n 1- Juego de mesa "LIFE "El juego de la vida"": $4750 \n 2- Juego de mesa "Monopoly": $5390 \n 3- Juego de mesa "Preguntados Realidad Aumentada": $3450 \n 4- Juego de mesa "Juego de la Memoria":$1890 \n 5- Juego de mesa "Jenga Plástico": $1890 \n 6- Juego de mesa "Cuatro en Línea": $1890 \n 7- Juego de mesa "Letras 3D": $1990 \n 8- Juego de mesa "Batalla Naval": $1650 \n 9- Juego de mesa "Crisis: El mundo en juego": $5450')))
let juegoSeleccionado

function carrito(producto, precio) {
    juegoSeleccionado = producto
    alert(usuario + ' usted seleccionó: ' + producto + ' a $' + precio)
}

switch (juego) {
    case 1:
        carrito('Juego de mesa "LIFE "El juego de la vida"', 4750)
        break

    case 2:
        carrito('Juego de mesa "Monopoly"', 5390)
        break

    case 3:
        carrito('Juego de mesa "Preguntados Realidad Aumentada"', 3450)
        break

    case 4:
        carrito('Juego de mesa "Juego de la Memoria"', 1890)
        break

    case 5:
        carrito('Juego de mesa "Jenga Plástico"', 1890)
        break

    case 6:
        carrito('Juego de mesa "Cuatro en Línea"', 1890)
        break

    case 7:
        carrito('Juego de mesa "Letras 3D"', 1990)
        break

    case 8:
        carrito('Juego de mesa "Batalla Naval"', 1650)
        break

    case 9:
        carrito('Juego de mesa "Crisis: El mundo en juego"', 5450)
        break
}

compra = prompt('Desea completar su compra de ' + juegoSeleccionado + ' Si/No').toLowerCase()

if (compra === 'si') {
    alert('Gracias por su compra!')
}

else {
    alert('Gracias por su visita!')
}

