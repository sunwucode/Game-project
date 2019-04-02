const canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");

class Column {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    var ctx = canvas.getContext("2d");
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor(x, y, width, color) {
    this.width = width;
    this.color = color;
    this.x = x;
    this.y = y;
  }
  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    context.fill();
  }
}
let x = new Ball(50, 350, 50, "black");
x.draw(ctx);
//first obstacle
ctx.fillRect(220, 500, 100, 100);
ctx.fillRect(330, 500, 100, 100);
ctx.fillRect(220, 390, 100, 100);
ctx.fillRect(330, 390, 100, 100);
ctx.fillRect(330, 280, 100, 100);

// moving plateforme
ctx.fillRect(800, 280, 200, 50);

//column Array
// ctx.fillRect(600, 280, 100, 310);
// var column2 = new column(1500, 100, 100, 100);
// column2.draw();
var columns = [new column(1500, 100, 100, 100), new column(600, 280, 100, 310)];

class movingPlateform {}
