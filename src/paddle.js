class Paddle {
  constructor(x, y, width = 75, height = 10, stroke, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.stroke = stroke;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.stroke;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

export default Paddle;
