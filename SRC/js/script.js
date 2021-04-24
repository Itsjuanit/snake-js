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
  direccion: { x: 1, y: 0 },
  bicho: [{ x: 0, y: 0 }],
  victima: { x: 0, y: 250 }
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

let dibujar = (color) => {
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = "green";
  const sq = controles.bicho[0];
  ctx.fillRect(sq.x * PESO, sq.y * PESO, 20, 20);   
};

window.onload = () => {
  //pruebas para ver si funciona
  //looper();
};
