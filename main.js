// Create a paddle at this x value.
function Paddle(xVal) {
  ; //todo
}

function World() {
  // Reset the world to the countdown state
  this._reset = function() {
    //todo
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

  this._opp_paddle = Paddle(consts.paddlePad);
  this._my_paddle = Paddle(canvas.width - consts.paddlePad);
  this._reset();
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
