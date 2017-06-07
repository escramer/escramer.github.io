function main() {
  requestAnimationFrame(main);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = consts.screenW;
canvas.height = consts.screenH;
requestAnimationFrame(main);
