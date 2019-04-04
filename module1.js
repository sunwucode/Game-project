// General Setting

var currentColor = "black";
var gravity = 1;

var myGameArea = {
  canvas: document.getElementById("canvas"),
  containedObjects: [],
  setCanvas: function() {
    this.canvas.width = canvas.scrollWidth;
    this.canvas.height = canvas.scrollHeight;
    this.canvas.color = canvas.color;
    this.ctx = canvas.getContext("2d");

    this.interval = setInterval(updateGameArea, 100);
  },
  listenKeyboard: function() {
    document.onkeydown = function(event) {
      switch (event.keyCode) {
        case 38: // up arrow
          player1.speedY -= 10;
          break;
        case 40: // down arrow
          player1.speedY += 10;
          break;
        case 37: // left arrow
          player1.speedX -= 10;
          break;
        case 39: // right arrow
          player1.speedX += 10;
          break;
        case 88: // key x
          currentColor = currentColor === "black" ? "white" : "black";
          // ternaire, très utile pour des attributions.

          break;
      }
    };
  },
  start: function() {
    this.setCanvas();
    this.listenKeyboard();
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};
//calls all the obstacles from the Array
function drawObstacles() {
  player1.draw();
  for (let i = 0; i < myGameArea.containedObjects.length; i++) {
    myGameArea.containedObjects[i].draw();
  }
}

function updateGameArea() {
  myGameArea.clear();

  drawObstacles();

  player1.newPos();
  player1.boundaries();
  player1.draw();
  player1.speedY += gravity;
  rectangleCollision(player1, myGameArea.containedObjects);
}
// Definition of the Player object / Ball class

class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.isBlocked = false;
  }
  draw() {
    //myGameArea.ctx.fillStyle = this.color;
    myGameArea.ctx.fillStyle = currentColor;
    myGameArea.ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle)
    myGameArea.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    myGameArea.ctx.fill();
  }
  newPos() {
    function checkXvalid(ballX, balRadius, obstX, obstWidth) {
      // console.log("obstX", obstX);
      return ballX + balRadius >= obstX;
    }
    // console.log("thisX", this.x);
    for (let i = 0; i < myGameArea.containedObjects.length; i++) {
      // console.log(myGameArea.containedObjects[i]);

      if (
        checkXvalid(
          this.x,
          this.radius,
          myGameArea.containedObjects[i].x,
          myGameArea.containedObjects[i].width
        )
      ) {
        this.y += this.speedY;
      } else {
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }
    //bally + balRadius >= obstY
    // function checkYvalid(bally, balRadius, obstY, obstHeight) {
    //   return bally + balRadius <= obstY || bally + balRadius >= obstY;
    // }
    // console.log(checkYvalid());
    // for (let i = 0; i < myGameArea.containedObjects.length; i++) {
    //   if (
    //     checkYvalid(
    //       this.y,
    //       this.radius,
    //       myGameArea.containedObjects[i].y,
    //       myGameArea.containedObjects[i].height
    //     )
    //   ) {
    //     this.x += this.speedX;
    //   } else {
    //     this.x += this.speedX;
    //     this.y += this.speedY;
    //   }
    // }
  }

  boundaries() {
    if (this.y + this.radius >= canvas.height) {
      this.y = canvas.height - this.radius;
      this.boundaries.speedY = 0;
      gravity = 0;
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      gravity = 0;
    }
    // if (
    //   this.y + this.speedY > canvas.height ||
    //   this.y + this.speedY < this.radius
    // ) {
    //   this.y = 0;
    // }
    // if (
    //   this.x + this.speedX > canvas.width ||
    //   this.x + this.speedX < this.radius
    // ) {
    //   this.speedX = 0;
    // }
  }
}

myGameArea.start();
let player1 = new Ball(50, 550, 50, "black");
// myGameArea.containedObjects.push(player1);
player1.draw(myGameArea.ctx);

// key up function - to apply ?
// document.onkeyup = function(event) {
//   Ball.speedX = 0;
//   Ball.speedY = 0;
// };

// obstacles /////////////////////////////////////////////
class Shapes {
  constructor(x, y, width, height, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = speedX || 0;
    this.speedY = speedY || 0;
    this.draw();
  }
  draw() {
    myGameArea.ctx.fillStyle = currentColor;
    myGameArea.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Column extends Shapes {
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }
}

class movingPlateform {}

// Collision (of Abi's flappy bird)
// -----------------------------------------------------------------------------
function rectangleCollision(player1, rectB) {
  // console.log(player1, rectB.slice(20));
  return (
    player1.y + player1.height >= rectB.y &&
    player1.y <= rectB.y + rectB.height &&
    player1.x + player1.width >= rectB.x &&
    player1.x <= rectB.x + rectB.width
  );
}

function initObstacles() {
  myGameArea.containedObjects.push(new Column(220, 500, 100, 100));
  // myGameArea.containedObjects.push(new Column(330, 500, 100, 100));
  // myGameArea.containedObjects.push(new Column(220, 390, 100, 100));
  // myGameArea.containedObjects.push(new Column(330, 390, 100, 100));
  // myGameArea.containedObjects.push(new Column(330, 280, 100, 100));
  // myGameArea.containedObjects.push(new Column(1500, 100, 100, 100));
  // myGameArea.containedObjects.push(new Column(600, 280, 100, 310));
  // myGameArea.containedObjects.push(new Column(800, 280, 200, 50));
}

initObstacles();
