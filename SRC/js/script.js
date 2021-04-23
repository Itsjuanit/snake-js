const DIRECTION = {
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
let controles = { direction: { x: 1, y: 0 }, head: [{ x: 0, y: 0 }] };
const INTERVALO = 80;
let keyPress;

let paper = document.querySelector("canvas");
let looper = () => {
  const cabe = controles.head[0];
  let dx = controles.directcion.x;
  let dy = controles.directcion.y;
  cabe.x += dx;
  cabe.x += dy;
  requestAnimationFrame(draw);
  console.log("looper");
  setTimeout(looper, INTERVALO);
};
let ctx = paper.getContext("2d");

document.onkeydown = (e) => {
  keyPress = DIRECTION[e.key];
  console.log(keyPress);
};

let draw = (color) => {
  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = "green";
  const cabe = controles.head[0];
  ctx.fillRect(cabe.x, cabe.y, 10, 10);
};

window.onload = () => {
  looper();
};
