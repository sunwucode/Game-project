// General Setting

var myGameArea = {
  canvas: document.getElementById("canvas"),
  containedObjects: [],
  setCanvas: function() {
    this.canvas.width = canvas.scrollWidth;
    this.canvas.height = canvas.scrollHeight;
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
      }
    };
  },
  start: function() {
    console.log(this);
    this.setCanvas();
    this.listenKeyboard();
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

// update() {

function drawObstacles() {
  myGameArea.ctx.fillRect(220, 500, 100, 100);
  myGameArea.ctx.fillRect(330, 500, 100, 100);
  myGameArea.ctx.fillRect(220, 390, 100, 100);
  myGameArea.ctx.fillRect(330, 390, 100, 100);
  myGameArea.ctx.fillRect(330, 280, 100, 100);

  // moving plateforme
  myGameArea.ctx.fillRect(800, 280, 200, 50);
}

function updateGameArea() {
  myGameArea.clear();
  drawObstacles();
  player1.newPos();
  player1.draw();
}
// Definition of the Player object / Ball class

class Ball {
  constructor(x, y, width, color) {
    this.width = width;
    this.color = color;
    this.x = x;
    this.y = y;
    // new speed properties
    this.speedX = 0;
    this.speedY = 0;
    isblocked: false;
  }
  draw(context) {
    myGameArea.ctx.fillStyle = this.color;
    myGameArea.ctx.beginPath();
    myGameArea.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    myGameArea.ctx.fill();
  }
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
myGameArea.start();
let player1 = new Ball(50, 550, 50, "black");
myGameArea.containedObjects.push(player1);
player1.draw(myGameArea.ctx);

//Keyboard controls

// key up function - to apply ?
// document.onkeyup = function(event) {
//   Ball.speedX = 0;
//   Ball.speedY = 0;
// };

// obstacles /////////////////////////////////////////////
class Column {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    myGameArea.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
//first obstacle
drawObstacles();

//column Array
// ctx.fillRect(600, 280, 100, 310);
// var column2 = new column(1500, 100, 100, 100);
// column2.draw();
// var columns = [new Column(1500, 100, 100, 100), new Column(600, 280, 100, 310)];
myGameArea.containedObjects.push(new Column(1500, 100, 100, 100));
myGameArea.containedObjects.push(new Column(600, 280, 100, 310));
class movingPlateform {}

// drawLoop();

// function drawLoop() {
//   ctx.clearRect(player1.x, player1.y, 50, 0, Math.PI * 2);
//   drawPlayer1();

//   requestAnimationFrame(function() {
//     drawLoop();
//   });
// }
// setInterval(function() {
//   update();
//   player1.draw(ctx);
// }, 100);

// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
