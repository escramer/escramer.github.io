function main() {
  requestAnimationFrame(main);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

canvas = document.getElementById('myCanvas');
canvas.width = consts.screenW;
canvas.height = consts.screenH;
ctx = canvas.getContext('2d');
requestAnimationFrame(main);
