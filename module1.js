const canvas = document.getElementById("canvas");

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

var ctx = canvas.getContext("2d");

class column {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
// the ball1
ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(50, 350, 30, 0, Math.PI * 2);
ctx.fill();

//first obstacle
ctx.fillRect(220, 500, 100, 100);
ctx.fillRect(330, 500, 100, 100);
ctx.fillRect(220, 390, 100, 100);
ctx.fillRect(330, 390, 100, 100);
ctx.fillRect(330, 280, 100, 100);

//column Array
ctx.fillRect(600, 280, 100, 310);

// moving plateforme
ctx.fillRect(800, 280, 200, 50);

var column2 = new column(1500, 100, 100, 100);
column2.draw();
