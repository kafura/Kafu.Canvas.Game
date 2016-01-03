(function(window) {
  window.k = window.k || {};

  window.k.game = (function() {
    //var keyboard = k.keyboard();
    var rafId = void 0; // Id til requestAnimationFrame
    var keyPressed = void 0;
    var canvas  = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // canvas.width = window.innerWidth;

    var ball = {
      x: 100,
      y: 100,
      vx: 1, // hastighed
      vy: 1, // hastighed
      radius: 5,
      color: 'green',
      draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    };

    var clear = function() {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    function draw() {

      //console.log("Hep", kInput.keyPressed);
      //var keyPressed = keyboard.getKeyPressed();
      if(keyPressed != undefined && keyPressed.length > 0) {
        // console.log("Hep", keyPressed);
        // clicker.value = keyPressed;


        clear();
        //console.log("draw", keyPressed.length);
        if(keyPressed.indexOf(k.key.KEY.UP) > -1) {
          ball.y -= ball.vy;
          if(ball.y < 0) {
            ball.y = canvas.height;
          }
        }

        if(keyPressed.indexOf(k.key.KEY.DOWN) > -1) {
          ball.y += ball.vy;
          if(ball.y > canvas.height) {
            ball.y = 0;
          }
        }

        if(keyPressed.indexOf(k.key.KEY.LEFT) > -1) {
          ball.x -= ball.vx;
          if(ball.x < 0) {
            ball.x = canvas.width;
          }
        }

        if(keyPressed.indexOf(k.key.KEY.RIGHT) > -1) {
          ball.x += ball.vx;
          if(ball.x > canvas.width) {
            ball.x = 0;
          }
        }

        ball.draw();
      }

      rafId = window.requestAnimationFrame(draw);
    };

    ball.draw();

    var down = function(keyCode) {
      keyPressed = keyCode;
      rafId = window.requestAnimationFrame(draw);
    };

    var up = function(keyCode) {
      window.cancelAnimationFrame(rafId);
    };

    k.key([37, 38, 39, 40], down, up);
  })();
})(window);
