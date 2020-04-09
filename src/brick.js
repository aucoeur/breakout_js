class Brick {
  constructor(x = 0, y = 0, width = 75, height = 20, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.status = 1;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
