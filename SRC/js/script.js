const direction = {
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
const intervalo = 80;
let keyPress;

let paper = document.querySelector("canvas");
let looper = () => {
  console.log();
  setTimeout(looper, intervalo);
};
let ctx = paper.getContext("2d");
ctx.fillStyle = "#3a9c54";
ctx.fillRect(200, 200, 20, 20);

document.onkeydown = (e) => {
  keyPress = direction[e.key];
  console.log(keyPress);
};
