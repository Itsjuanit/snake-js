// const = asdas

const CANVASIZE = 400;
const INTERVALO = 80;
const PESO = 10;
const DIRECCION = {
  ArrowDown: [0, 1],
  ArrowUp: [0, -1],
  ArrowRight: [1, 0],
  ArrowLeft: [-1, 0],
  S: [0, 1],
  W: [0, -1],
  D: [1, 0],
  A: [-1, 0],
  s: [0, 1],
  w: [0, -1],
  d: [1, 0],
  a: [-1, 0],
};

let controles = {
  direccion: {
    x: 1,
    y: 0,
  },
  bicho: [
    {
      x: 0,
      y: 0,
    },
  ],
  victima: {
    x: 0,
    y: 250,
  },
  jugando: false,
  crecimiento: 0,
};

let teclaApre;

let paper = document.querySelector("canvas");

let looper = () => {
  let cola = {};
  Object.assign(cola, controles.bicho[controles.bicho.length - 1]);
  const sq = controles.bicho[0];
  let atrapado = sq.x === controles.victima.x && sq.y === controles.victima.y;
  if (detectarChoque()) {
    controles.jugando = false;
    console.log("fin");
    mostrarModal();
    reiniciar();
  }

  let dx = controles.direccion.x;
  let dy = controles.direccion.y;
  let tamaño = controles.bicho.length - 1;

  if (controles.jugando) {
    for (let idx = tamaño; idx > -1; idx--) {
      const sq = controles.bicho[idx];
      if (idx === 0) {
        sq.x += dx;
        sq.y += dy;
      } else {
        sq.x = controles.bicho[idx - 1].x;
        sq.y = controles.bicho[idx - 1].y;
      }
    }
  }

  if (atrapado) {
    controles.crecimiento += 2;
    revictima();
  }

  if (controles.crecimiento > 0) {
    controles.bicho.push(cola);
    controles.crecimiento -= 1;
  }
  requestAnimationFrame(dibujar);
  setTimeout(looper, INTERVALO);
};

let detectarChoque = () => {
  const head = controles.bicho[0];
  if (
    head.x < 0 ||
    head.x >= CANVASIZE / PESO ||
    head.y >= CANVASIZE / PESO ||
    head.y < 0
  ) {
    return true;
  }

  for (let idx = 1; idx < controles.bicho.length; idx++) {
    const sq = controles.bicho[idx];
    if (sq.x === head.x && sq.y === head.y) {
      return true;
    }
  }
};

let ctx = paper.getContext("2d");

document.onkeydown = (e) => {
  teclaApre = DIRECCION[e.key];
  const [x, y] = teclaApre;
  if (-x !== controles.direccion.x && -y !== controles.direccion.y) {
    controles.direccion.x = x;
    controles.direccion.y = y;
  }
};

let dibujar = () => {
  ctx.clearRect(0, 0, CANVASIZE, CANVASIZE);
  for (let idx = 0; idx < controles.bicho.length; idx++) {
    const { x, y } = controles.bicho[idx];
    draw("#3c9e3a", x, y);
  }
  const victima = controles.victima;
  draw("#60bf79", victima.x, victima.y);
};

let draw = (color, x, y) => {
  console.log("draw", color, x, y);
  ctx.fillStyle = color;
  ctx.fillRect(x * PESO, y * PESO, 20, 20);
};

let randomSite = () => {
  let whereDirection = Object.values(DIRECCION);
  return {
    x: parseInt((Math.random() * CANVASIZE) / PESO),
    y: parseInt((Math.random() * CANVASIZE) / PESO),
    d: whereDirection[parseInt(Math.random() * 11)],
  };
};
let puntuacion = 0;
let revictima = () => {
  let newPosition = randomSite();
  let victima = controles.victima;
  victima.x = newPosition.x;
  victima.y = newPosition.y;
  puntuacion += 1;
  document.getElementById("puntuacion").innerHTML = `Puntuacion :${puntuacion}`;
};
function mostrarModal() {
  const modal = document.getElementById("modal");
  const puntuacion = document.getElementById("puntuacion").textContent;
  const modalPuntuacion = document.getElementById("modal-puntuacion");
  modalPuntuacion.textContent = puntuacion;
  modal.style.display = "block";
}
const modalReiniciar = document.getElementById("modal-reiniciar");
modalReiniciar.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  reiniciar();
});

let reiniciar = () => {
  controles = {
    direccion: {
      x: 1,
      y: 0,
    },
    bicho: [
      {
        x: 0,
        y: 0,
      },
    ],
    victima: {
      x: 0,
      y: 250,
    },
    jugando: false,
    crecimiento: 0,
  };
  positions = randomSite();
  let head = controles.bicho[0];
  head.x = positions.x;
  head.y = positions.y;
  controles.direccion.x = positions.d[0];
  controles.direccion.y = positions.d[1];
  posiVic = randomSite();
  let victima = controles.victima;
  victima.x = posiVic.x;
  victima.y = posiVic.y;
  controles.jugando = true;

  // Aquí reseteas la puntuación a 0
  puntuacion = 0;
  document.getElementById("puntuacion").innerHTML = `Puntuacion :${puntuacion}`;
};

//SE INICIA EL JUEGO
window.onload = () => {
  reiniciar();
  //pruebas para ver si funciona
  looper();
};
