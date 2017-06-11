/* Create a paddle.

isLeft is whether or not this is the left paddle.
*/
function Paddle(isLeft) {
  // Draw the paddle.
  this.draw = function() {
    ctx.fillRect(this._leftEdge, this._y, consts.paddleW, consts.paddleH);
  }

  /* Update the position of this paddle.

  dir is either 'up', 'down', or 'stop'.
  dt is in seconds.
  */
  this.update = function(dir, dt) {
    if (dir === 'stop') {
      return;
    }

    if (dir === 'up' && this._y < conv.paddleMaxY) {
      this._y = Math.min(this._y + consts.paddleSpeed * dt, conv.paddleMaxY);
    }
    else if (dir === 'down' && this._y > 0) {
      this._y = Math.max(this._y - consts.paddleSpeed * dt, 0);
    }
  }

  // Set the y position to be its default.
  this.resetPos = function() {
    // this._y represents the upper edge.
    this._y = conv.halfHeight - consts.paddleH / 2;
  }

  if (isLeft) {
    this._leftEdge = consts.paddlePad;
    this._rightEdge = consts.paddlePad + consts.paddleW;
    this._x = this._rightEdge; // Represents the edge used in ball collisions
  }
  else {
    this._rightEdge = consts.screenW - consts.paddlePad;
    this._leftEdge = this._rightEdge - consts.paddleW;
    this._x = this._leftEdge;
  }
  this._isLeft = isLeft;
  this.resetPos();
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
    ctx.fillRect(
      this._x - consts.ballR, this._y - consts.ballR, conv.ballDiam,
      conv.ballDiam
    );
  }

  this._x = conv.halfWidth;
  this._y = conv.halfHeight;
  this._vx = goRight ? consts.ballSpeed : -consts.ballSpeed;
  this._vy = 0;
}


// Keep track of dt
function DTTracker() {
  // Set the time.
  this.setTS = function(timestamp) {
    if (this._timestamp === undefined) {
      this._timestamp = timestamp;
      this._dt = 0;
    }
    else {
      this._dt = timestamp - this._timestamp;
      this._timestamp = timestamp
    }
  }

  // Get the time in seconds between the current timestamp and the previous one.
  this.getDT = function() {
    return this._timestamp === undefined ? 0 : this._dt / 1000;
  }

  // Get the current time. This will return undefined if no timestamp was set.
  this.getTS = function() {
    return this._timestamp;
  }
}

function World() {
  this.update = function(timestamp) {
    this._dtTracker.setTS(timestamp);

    if (this._state === 'menu') {
      if (keyboard.has(' ')) {
        this._resetScore();
        this._setBtnGames();
      }
    }
    else if (this._state == 'btnGames') {
      this._countdown -= this._dtTracker.getDT();
      if (this._countdown <= 0) {
        this._ball = new Ball(this._serveToMe);
        this._state = 'game';
        //todo: update paddles
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
    var yVal = 80;
    var deltaX = 100;
    ctx.font = '80px sans-serif';
    ctx.fillText(this._myScore.toString(), conv.halfWidth + deltaX, yVal);
    ctx.fillText(this._oppScore.toString(), conv.halfWidth - deltaX, yVal);
  }

  // Draw the dashed line in the middle.
  this._drawDash = function() {
    ctx.lineWidth = 5;
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(conv.halfWidth, 0);
    ctx.lineTo(conv.halfWidth, canvas.height);
    ctx.stroke();
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
    ctx.strokeStyle = consts.color;

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
  this._dtTracker = new DTTracker();
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
function mainLoop(timestamp) {
  requestAnimationFrame(mainLoop);
  world.update(timestamp);
  world.draw();
}

function main() {
  init();
  requestAnimationFrame(mainLoop);
}

main();
