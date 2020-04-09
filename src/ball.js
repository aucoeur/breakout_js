class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, stroke = '#d400ff', color = '#ffffff') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.stroke = stroke;
    this.color = color;
  }

  move() {
    this.x += this.dx;
    this.x += this.dx;
    this.y += this.dy;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

export default Ball;