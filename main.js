function World() {
  this.update = function() {
    ; //todo
  }

  this.draw = function() {
    ; //todo
  }
}

// Do initializations here.
function init() {
  var canvas = document.getElementById('myCanvas');

  canvas.width = consts.screenW;
  canvas.height = consts.screenH;
  window.canvas = canvas;
  window.ctx = canvas.getContext('2d');
  window.world = World();
}

// Update the state of the world, draw it, and repeat.
function mainLoop() {
  requestAnimationFrame(mainLoop);
  world.update();
  world.draw();
}

init();
requestAnimationFrame(mainLoop);
