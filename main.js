// Create a paddle at this x value. This is the left edge.
function Paddle(xVal) {
  ; //todo
}


// Return whether or not the button index is pressed.
function isPressed(button) {
  return navigator.getGamepads()[0].buttons[button].pressed;
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
  this.update = function() {
    if (this._state === 'menu') {
      if (isPressed(ps4.X)) {
        this._setBtnGames();
        this._resetScore();
      }
    }

    //todo
  }

  // Set the state to be between games (the score is not reset).
  this._setBtnGames = function() {
    this._state = 'btnGames';
    this._countdown = 1;
  }

  // Reset the score.
  this._resetScore = function() {
    this._myScore = 0;
    this._oppScore = 0;
  }

  // Draw the menu.
  this._drawMenu = function() {
    var subTitle;
    ctx.textAlign = 'center';
    ctx.font = '40px sans-serif'
    ctx.fillText(consts.title, canvas.width/2, canvas.height/3);
    ctx.font = '20px sans-serif'
    if (navigator.getGamepads()[0] === null) {
      subTitle = "Connect a controller. If it's already plugged in, press a " +
        "button or two.";
    }
    else {
      subTitle = 'Press X to play.';
    }
    ctx.fillText(
      subTitle,
      canvas.width/2, canvas.height/2
    );
  }

  this.draw = function() {
    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = consts.color;

    if (this._state === 'menu') {
      this._drawMenu();
    }

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
  window.world = new World();
}

// Update the state of the world, draw it, and repeat.
function mainLoop() {
  requestAnimationFrame(mainLoop);
  world.update();
  world.draw();
}

function main() {
  init();
  requestAnimationFrame(mainLoop);
}

main();
