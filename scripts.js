(function(window) {
	"use strict";

	window.kk = (function() {
		var keyboard = k.keyboard();
		var rafId = void 0;
		var clicker = document.getElementById("clicker");
		function stop() {
			window.cancelAnimationFrame(rafId);
			console.log("stop");
		};

		function update() {
			//console.log("Hep", kInput.keyPressed);
			var keyPressed = keyboard.getKeyPressed();
			if(keyPressed != undefined) {
				console.log("Hep", keyPressed);
				clicker.value = keyPressed;
				switch (keyPressed) {
					case keyboard.KEY.QUIT:
						stop();
						return;
					default:

				}
			}

			rafId = window.requestAnimationFrame(update);
		};

		//kInput.init();
		rafId = window.requestAnimationFrame(update);

	})();

	window.k = (function() {
		//var c = "null";
		var ctx;
		var canvas = null;
		var rafId = null;

		var sun = new Image();
		var moon = new Image();
		var earth = new Image();

		var init = function() {
			canvas = document.getElementById("canvas");
			this.ctx = ctx = canvas.getContext("2d");
		};

		var draw = function() {
			window.cancelAnimationFrame(rafId);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgb(200,0,0)";
      ctx.fillRect (10, 10, 55, 50);

      ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      ctx.fillRect (30, 30, 55, 50);
		};

		var solar = function() {
			window.cancelAnimationFrame(rafId);
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  		moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  		earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

			rafId = window.requestAnimationFrame(drawSolar);
		};

		var drawSolar = function() {
			ctx.globalCompositeOperation = 'destination-over';
		  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

		  ctx.fillStyle = 'rgba(0,0,0,0.4)';
		  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
		  ctx.save();
		  ctx.translate(150,150);

		  // Earth
		  var time = new Date();
		  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
		  ctx.translate(105,0);
		  ctx.fillRect(0,-12,50,24); // Shadow
		  ctx.drawImage(earth,-12,-12);

		  // Moon
		  ctx.save();
		  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
		  ctx.translate(0,28.5);
		  ctx.drawImage(moon,-3.5,-3.5);
		  ctx.restore();

		  ctx.restore();

		  ctx.beginPath();
		  ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
		  ctx.stroke();

		  ctx.drawImage(sun,0,0,300,300);

			rafId = window.requestAnimationFrame(drawSolar);
		};

		return {
			init: init,
			square: draw,
			solar: solar,
			ctx: null
		}
	})();

	window.onload = function() {

		// var hep = document.getElementById("hepper");
		// hep.innerHTML = "Helleo";

		k.init();
	};
})(window);
