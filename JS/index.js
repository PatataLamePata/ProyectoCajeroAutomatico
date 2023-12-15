const usuarios = [
    { username: 'manolo', password: '1234', saldo: 500000 },
    { username: 'pepe', password: '1234', saldo: 750000 },
    { username: 'maria', password: '1234', saldo: 1000000 },
];

let montoRetiro = document.getElementById("cantRetiro");
let montoIngreso = document.getElementById("cantIngreso");

const revision = document.querySelector("#revision")

let usuarioActual = null;  // Variable para almacenar la información del usuario actual

function verificarAutenticacion(username, password) {
    for (const usuario of usuarios) {
        if (usuario.username === username && usuario.password === password) {
            usuarioActual = usuario;  // Almacena la información del usuario actual
            return true;
        }
    }
    return false;
}

Eleccion.style.display = 'none';
retiro.style.display = 'none';
ingreso.style.display = 'none';
verSaldo.style.display = 'none';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    Eleccion.style.display = 'none'

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (verificarAutenticacion(username, password)) {
        document.getElementById('mensaje').textContent = '¡Inicio de sesión exitoso!';
        Ingreso.style.display = 'none'
        Eleccion.style.display = 'flex'
        
    } else {
        document.getElementById('mensaje').textContent = 'Usuario o contraseña incorrectos.';
        Eleccion.style.display = 'none'
    }
});

document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const respuestas = {
        q1: document.querySelector('input[name="q1"]:checked').value
    };

    let resultado = 'Tus respuestas:\n';

    for (const pregunta in respuestas) {
        resultado += `${pregunta}: ${respuestas[pregunta]}\n`;
    }

    if(respuestas.q1 === 'Retiro'){
        Eleccion.style.display = 'none'
        retiro.style.display = 'flex'

    } else if (respuestas.q1 === 'Ingreso'){
        Eleccion.style.display = 'none'
        ingreso.style.display = 'flex'
    } else if (respuestas.q1 === 'VerSaldo'){
        fverSaldo()
    }




});

function fRetiro() {
    let montoRetiroValue = montoRetiro.value.trim(); // Trim para eliminar espacios en blanco al inicio y al final
    let z = parseFloat(montoRetiroValue);

    // Verificar si el valor no está vacío y es un número válido
    if (montoRetiroValue !== "" && !isNaN(z)) {
        if (usuarioActual) {
            usuarioActual.saldo -= z;
            console.log(`Nuevo saldo para ${usuarioActual.username}: ${usuarioActual.saldo}`);
        } else {
            console.log("Ningún usuario autenticado.");
        }

        Eleccion.style.display = 'flex';
        retiro.style.display = 'none';

        montoRetiro.value = "";
    } else {
        console.log("Ingrese un monto válido.");
        // También podrías mostrar un mensaje al usuario o tomar otra acción para manejar la entrada inválida.
    }
}

function fIngreso() {
    let montoIngresoValue = montoIngreso.value.trim(); // Trim para eliminar espacios en blanco al inicio y al final
    let z = parseFloat(montoIngresoValue);

    if (montoIngresoValue !== "" && !isNaN(z)) {
        // Verifica que haya un usuario autenticado antes de realizar el ingreso
        if (usuarioActual) {
            usuarioActual.saldo += z;
            console.log(`Nuevo saldo para ${usuarioActual.username}: ${usuarioActual.saldo}`);
        } else {
            console.log("Ningún usuario autenticado.");
        }

        Eleccion.style.display = 'flex';
        ingreso.style.display = 'none';

        montoIngreso.value = "";
    } else {
        // Muestra un mensaje de error o toma la acción apropiada si el valor es inválido
        console.log("Ingrese un monto válido.");
        // También podrías mostrar un mensaje al usuario o tomar otra acción para manejar la entrada inválida.
    }
}

const volver = document.createElement("button");
volver.id = "continuar3";
volver.textContent = "Volver";
volver.addEventListener("click", fVolver);

function fverSaldo() {
    verSaldito.innerHTML = 'Tu saldo es de: ' + usuarioActual.saldo;

    Eleccion.style.display = 'none';
    verSaldo.style.display = 'flex';

    // Agregar el botón Volver al final del contenedor verSaldo
    if (!verSaldo.contains(volver)) {
        verSaldo.appendChild(volver);
    }
}

function fVolver() {
    Eleccion.style.display = 'flex';
    retiro.style.display = 'none';
    verSaldo.style.display = 'none';
    ingreso.style.display = 'none';
}

boton1 = document.querySelector("#continuar1")
boton2 = document.querySelector("#continuar2")
boton1.addEventListener("click", fRetiro)
boton2.addEventListener("click", fIngreso)

