function main() {
  requestAnimationFrame(main);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
requestAnimationFrame(main);
