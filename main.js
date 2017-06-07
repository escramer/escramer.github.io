// Create a paddle at this x value.
function Paddle(xVal) {
  ; //todo
}

/*
  Create a ball at the origin.

  If goRight is true, it should go
  to the right; otherwise, it should
  go to the left.
*/
function Ball(goRight) {
  ; //todo
}

function World() {
  // Set the state of the world to pause one second before serving.
  this._reset = function(goRight) {
    ; //todo
  }

  this.update = function() {
    ; //todo
  }

  this.draw = function() {
    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle('rgb(0,0,0)');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle(consts.color);

    //todo
  }

  this._state = 'menu';
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
