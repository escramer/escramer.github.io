// PS4 functionality

var ps4 = {
  X: 0,
  CIRCLE: 1,
  SQUARE: 2,
  TRI: 3,
  L1: 4,
  R1: 5,
  L2: 6,
  R2: 7,
  SHARE: 8,
  OPTIONS: 9,
  L3: 10,
  R3: 11,
  UP: 12,
  DOWN: 13,
  LEFT: 14,
  RIGHT: 15,
  PS: 16,
  TOUCH: 17,

  // Log the buttons being pressed.
  _showButtons: function() {
    var gamepad = navigator.getGamepads()[0]
    var buttons;
    if (gamepad === null) {
      console.log('Controller disconnected');
    }
    else {
      console.log('Below are the buttons currently pressed:');
      buttons = gamepad.buttons;
      for (var ndx = 0; ndx < buttons.length; ndx++) {
        if (buttons[ndx].pressed) {
          console.log(ndx);
        }
      }
    }
  },

  // Log the buttons being pressed every second.
  test: function() {
    setInterval(this._showButtons, 1000);
  }
}
