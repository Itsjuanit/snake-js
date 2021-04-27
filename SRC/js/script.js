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
  a: [-1, 0]
};

let controles = {
  direccion: {
    x: 1,
    y: 0
  },
  bicho: [
    {
      x: 0,
      y: 0
    }
  ],
  victima: {
    x: 0,
    y: 250
  },
  jugando: false
};
let teclaApre;

let paper = document.querySelector("canvas");
let looper = () => {
  const sq = controles.bicho[0];
  let dx = controles.direccion.x;
  let dy = controles.direccion.y;
  sq.x += dx;
  sq.y += dy;
  requestAnimationFrame(dibujar);
  setTimeout(looper, INTERVALO);
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
  const sq = controles.bicho[0];
  const victima = controles.victima;
  draw("green", sq.x, sq.y);
  draw("green", victima.x, victima.y);
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
    d: whereDirection[parseInt(Math.random() * 11)]
  };
};

//SE INICIA EL JUEGO
window.onload = () => {
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
  
  //pruebas para ver si funciona
  looper();
};
