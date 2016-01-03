(function(window) {
	"use strict";

	window.k = window.k || {};

  window.k.key = function(keys, downCallback, upCallback) {
    var keysDown = [];

    var press = function(e) {
      var code = e.keyCode;
      if(keys.indexOf(code) > -1) {
        if(keysDown.indexOf(code) < 0) {
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
    LEFT: 37,
		UP: 38,
    RIGHT: 39,
    DOWN: 40,

		D: 68,
		S: 83,
		W: 87,
		A: 65,
		Q: 81,

		SPACE: 32
  };
})(window);
