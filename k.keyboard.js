(function(window) {
	"use strict";

  window.k = window.k || {};

	window.k.keyboard = function() {
		var keyPressed = void 0;
		var rafId = void 0;

		var I = {
			RIGHT: "right",
			LEFT: "left",
			UP: "up",
			DOWN: "down",
			QUIT: "quit",
			FIRE: "fire"
		};

		var keyCode = {
			68: I.RIGHT, // D
			39: I.RIGHT, // Right

			83: I.DOWN, // S
			40: I.DOWN, // Down

			87: I.UP, // W
			38: I.UP, // Up

			65: I.LEFT, // A
			37: I.LEFT, // Left

			81: I.QUIT, // Q

			32: I.FIRE, // SPACE
		};

		function press(evt) {
		  var code = evt.keyCode;
			keyPressed = keyCode[code];
		}

		function release(evt) {
		  var code = evt.keyCode;
			keyPressed = I.NONE;

			// Skriv lige hvis vi klikker på noget vi ikke kender
			if(keyCode[code] == undefined) {
				console.info('unrecognized key code: ' + code);
			}
		}

    document.addEventListener("keydown", press);
    document.addEventListener("keyup", release);

		return {
			getKeyPressed: function() {
				return keyPressed;
			},

			KEY: I
		};
	};

  window.k.key = function(keys, downCallback, upCallback) {
    var keysDown = [];

    var press = function(e) {
      var code = e.keyCode;
      if(keys.indexOf(code) > -1) {
        if(keysDown.indexOf(code) < 0) {
          //console.log("press", code, keys, keys.indexOf(code));

          keysDown.push(code);

          if(typeof downCallback == "function") {
            downCallback.call(this, keysDown);
          }
        }
      }
    };

    var release = function(e) {
      var code = e.keyCode;

      var index = keysDown.indexOf(code);
      if(index > -1) {
        //console.log("release", index, keysDown);

        keysDown.splice(index, 1);
        if(typeof upCallback == "function") {
          upCallback.call(this, keysDown);
        }
      }
    };

    document.addEventListener("keydown", press);
    document.addEventListener("keyup", release);
  };

  window.k.key.KEY = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37
  };
})(window);
