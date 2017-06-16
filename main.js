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

    if (dir === 'down' && this._y < conv.paddleMaxY) {
      this._y = Math.min(this._y + consts.paddleSpeed * dt, conv.paddleMaxY);
    }
    else if (dir === 'up' && this._y > 0) {
      this._y = Math.max(this._y - consts.paddleSpeed * dt, 0);
    }
  }

  this.getX = function() {
    return this._x;
  }

  // Get the y value of the top edge.
  this.getY = function () {
    return this._y;
  }

  // Return whether or not this is the left paddle.
  this.isLeft = function() {
    return this._isLeft;
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

  /* Update the ball as if the paddles did not exist.

  dt is in seconds.
  */
  this.update = function(dt) {
    this._x += this._vx * dt;
    this._y += this._vy * dt;
    if (
      this._y <= 0 && this._vy < 0 || this._y >= consts.screenH && this._vy > 0
    ) {
      this._vy *= -1;
    }
  }

  // Return the x value of the center of the ball.
  this.getX = function() {
    return this._x;
  }

  // Return the y value of the center of the ball.
  this.getY = function() {
    return this._y;
  }

  this.getVX = function() {
    return this._vx;
  }

  this.getVY = function() {
    return this._vy;
  }

  // Alter the velocity if the ball is hitting this paddle.
  this.bounce = function(paddle) {
    ; //todo
  }

  /* Get the position of the ball relative to the center of this paddle.
     i.e. return (ballY - <center of paddle>) / (half paddle height)
  */
  this._relY = function(paddle) {
    return (this._y - (paddle.getY() + conv.halfPaddleH)) / conv.halfPaddleH;
  }

  // Return whether or not the ball is hitting this paddle.
  this._isHittingPaddle = function(paddle) {
    var paddleX = paddle.getX();
    var paddleY = paddle.getY();

    if (paddle.isLeft()) {
      return this._x <= paddleX && this._vx < 0 && this._y >= paddleY &&
        this._y <= paddleY + consts.paddleH;
    }
    else {
      return this._x >= paddleX && this._vx > 0 && this._y >= paddleY &&
        this._y <= paddleY + consts.paddleH;
    }
  }

  /* Reset position and velocity.

  goRight is whether or not the ball should go to the right at the beginning.
  */
  this.reset = function(goRight) {
    this._x = conv.halfWidth;
    this._y = conv.halfHeight;
    this._vx = goRight ? consts.ballSpeed : -consts.ballSpeed;
    this._vy = 0;
  }

  this.reset(goRight);
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
    var dt;
    var ballX;
    this._dtTracker.setTS(timestamp);
    dt = this._dtTracker.getDT();

    if (this._state === 'menu') {
      if (keyboard.has(' ')) {
        this._newGame();
      }
    }

    else if (this._state == 'btnGames') {
      this._countdown -= dt;
      this._updatePaddles();
      if (this._countdown <= 0) {
        this._state = 'game';
      }
    }

    else if (this._state == 'game') { // game
      this._updatePaddles();
      this._ball.update(dt);
      //todo: Have the ball bounce against the paddle.

      ballX = this._ball.getX();
      if (ballX >= consts.screenW) {
        if (++this._oppScore === consts.winningScore) {
          this._state = 'gameOver';
        }
        else {
          this._setBtnGames(false);
        }
      }
      else if (ballX <= 0) {
        if (++this._myScore === consts.winningScore) {
          this._state = 'gameOver';
        }
        else {
          this._setBtnGames(true);
        }
      }
    }

    else { // gameOver
      this._updateMyPaddle();
      if (keyboard.has(' ')) {
        this._newGame();
      }
    }
  }

  // Reset to a new game (by first going between games).
  this._newGame = function() {
    this._resetScores();
    this._setBtnGames(true);
  }

  // Update the paddles.
  this._updatePaddles = function() {
    this._updateMyPaddle();
    this._updateOppPaddle();
  }

  // Update the opponent paddle.
  this._updateOppPaddle = function() {
    ;//todo
  }

  // Update my paddle.
  this._updateMyPaddle = function() {
    var dir;
    var dt = this._dtTracker.getDT();
    if (keyboard.has(consts.up) && !keyboard.has(consts.down)) {
      dir = 'up';
    }
    else if (keyboard.has(consts.down) && !keyboard.has(consts.up)) {
      dir = 'down';
    }
    else {
      dir = 'stop';
    }
    this._myPaddle.update(dir, dt);
  }

  /* Set the state to be between games (the score is not reset).

  goRight is whether the ball should be served to the right.
  */
  this._setBtnGames = function(goRight) {
    this._state = 'btnGames';
    this._countdown = 1;
    this._ball.reset(goRight);
  }

  // Reset the scores.
  this._resetScores = function() {
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
      'Press the space bar to play. Use ' + consts.up + ' and ' +
      consts.down + ' to move the paddle.',
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

  // Draw the win messages.
  this._drawWinMessages = function() {
    var xVal = this._myScore === consts.winningScore ? .75 * consts.screenW :
     .25 * consts.screenW;
    ctx.font = '80px sans-serif';
    ctx.fillText('WIN', xVal, 200);
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
    else if (this._state === 'game') {
      this._drawGameNoBall();
      this._ball.draw();
    }
    else { // gameOver
      this._drawGameNoBall();
      this._drawWinMessages();
    }
  }

  this._state = 'menu';
  this._myPaddle = new Paddle(false);
  this._oppPaddle = new Paddle(true);
  this._dtTracker = new DTTracker();
  this._ball = new Ball(true);
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
