/* Create a paddle.

isLeft is whether or not this is the left paddle.
*/
function Paddle(isLeft) {
  // Draw the paddle.
  this.draw = function() {
    ;//todo
  }

  //todo
}


/*
  Create a ball at the origin.

  If goRight is true, it should go
  to the right; otherwise, it should
  go to the left.
*/
function Ball(goRight) {
  // Draw the ball.
  this.draw = function() {
    ;//todo
  }

  //todo
}

function World() {
  this.update = function() {
    if (this._state === 'menu') {
      if (keyboard.has(' ')) {
        this._resetScore();
        this._setBtnGames();
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
    ctx.textAlign = 'center';
    ctx.font = '40px sans-serif';
    ctx.fillText(consts.title, canvas.width/2, canvas.height/3);
    ctx.font = '20px sans-serif';
    ctx.fillText(
      'Press the space bar to play.',
      canvas.width/2, canvas.height/2
    );
  }

  // Draw the scores.
  this._drawScores = function() {
    ;//todo
  }

  // Draw the dashed line in the middle.
  this._drawDash = function() {
    ctx.setLineDash([20, 5]);
    ctx.beginPath();
    ctx.moveTo(conv.halfWidth, 0);
    ctx.lineTo(conv.halfWidth, canvas.height);
    ctx.stroke();
    ctx.closePath();
  }

  // Draw the game without the ball.
  this._drawGameNoBall = function() {
    this._drawScores();
    this._drawDash();
    this._myPaddle.draw();
    this._oppPaddle.draw();
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
    else if (this._state === 'btnGames') {
      this._drawGameNoBall();
    }
    else { // game
      this._drawGameNoBall();
      this._ball.draw();
    }
  }

  this._state = 'menu';
  this._myPaddle = new Paddle(false);
  this._oppPaddle = new Paddle(true);
}

// Do initializations here.
function init() {
  var canvas = document.getElementById('myCanvas');

  canvas.width = consts.screenW;
  canvas.height = consts.screenH;
  window.canvas = canvas;
  window.ctx = canvas.getContext('2d');
  window.world = new World();
  window.keyboard = new Set(); // Set of keys that are down
  document.onkeydown = function(event) {
    keyboard.add(event.key);
  }
  document.onkeyup = function(event) {
    keyboard.delete(event.key);
  }
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
