// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Variables
let listaAmigos = [];
let amigosSorteados = [];
let juegoIniciado = false;

// Funciones

// Limpiar
function vaciarCaja() {
  document.getElementById("amigo").value = "";
}

// Validación
function validarNombre(nombre) {
  return /^[a-zA-Z0-9\s]+$/.test(nombre);
}

// Agregar nombres a la lista
function agregarAmigo() {
  let nombreIngresado = document.getElementById("amigo").value.trim();

  if (nombreIngresado === "") {
    alert("Tenes que ingresar un nombre");
  } else if (!validarNombre(nombreIngresado)) {
    alert("El nombre solo puede contener letras, números y espacios.");
  } else if (listaAmigos.includes(nombreIngresado)) {
    alert(
      `¡${nombreIngresado} ya existe! Intenta agregando la primera letra del apellido o un número.`
    );
  } else {
    listaAmigos.push(nombreIngresado);
    vaciarCaja();

    const listaImprimir = document.getElementById("listaAmigos");
    const li = document.createElement("li");
    li.textContent = nombreIngresado;

    // Botón de eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "X";
    botonEliminar.setAttribute("aria-label", `Eliminar ${nombreIngresado}`);
    botonEliminar.addEventListener("click", () => {
      listaAmigos = listaAmigos.filter((nombre) => nombre !== nombreIngresado);
      listaImprimir.removeChild(li);
      actualizarEstadoJuego();
    });

    li.appendChild(botonEliminar);
    listaImprimir.appendChild(li);
    actualizarEstadoJuego();
  }
}

// Sorteo aleatorio
function sortearAmigo() {
  if (listaAmigos.length < 3) {
    alert(
      "Necesitas al menos 3 nombres para comenzar el sorteo. Por favor, agrega más a la lista."
    );
    return;
  }

  if (!juegoIniciado) {
    iniciarSorteo();
  }

  const amigosNoSorteados = listaAmigos.filter(
    (amigo) => !amigosSorteados.includes(amigo)
  );

  if (amigosNoSorteados.length === 0) {
    finalizarSorteo();
    return;
  }

  const indiceAleatorio = Math.floor(Math.random() * amigosNoSorteados.length);
  const amigoSecreto = amigosNoSorteados[indiceAleatorio];
  amigosSorteados.push(amigoSecreto);

  let resultado = document.getElementById("resultado");
  resultado.textContent = `Tu amigo/a secreto/a es: ¡${amigoSecreto}!`;

  alert(
    "¡Haz clic en el nombre sorteado antes de pasárselo a la siguiente persona!"
  );

  // Esconder nombre al hacer click en el resultado
  resultado.addEventListener("click", () => {
    resultado.textContent = "";
  });
}

function iniciarSorteo() {
  juegoIniciado = true;
  document.getElementById("agregarBtn").setAttribute("disabled", true);
  document.getElementById("amigo").setAttribute("disabled", true);
  document.getElementById("listaAmigos").style.display = "none";
  document.querySelector(".input-wrapper").style.display = "none"; // Ocultar la barra de entrada
  document.querySelector("h2").textContent = "¡Sorteo en progreso!";
}

function finalizarSorteo() {
  alert(
    'Ya han sido sorteados todos tus amigos/as, ahora cada uno/a tiene su "Amigo Secreto".'
  );
  setTimeout(reiniciarSorteo, 0);
}

function reiniciarSorteo() {
  listaAmigos = [];
  amigosSorteados = [];
  juegoIniciado = false;
  document.getElementById("agregarBtn").removeAttribute("disabled");
  document.getElementById("amigo").removeAttribute("disabled");
  document.getElementById("listaAmigos").style.display = "block";
  document.getElementById("listaAmigos").innerHTML = "";
  document.querySelector("h2").textContent = "Escribí el nombre de tus amigos";
  document.getElementById("resultado").textContent = "";
  document.querySelector(".input-wrapper").style.display = "flex"; // Mostrar la barra de entrada
  actualizarEstadoJuego();
}

function actualizarEstadoJuego() {
  const sortearBtn = document.getElementById("sortearBtn");
  sortearBtn.disabled = false;
}

// Agregar amigo al presionar Enter
document.getElementById("amigo").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    agregarAmigo();
  }
});

// Inicialización
document.getElementById("agregarBtn").addEventListener("click", agregarAmigo);
document.getElementById("sortearBtn").addEventListener("click", sortearAmigo);
actualizarEstadoJuego();
