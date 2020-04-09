const canvas = document.getElementById('myCanvas');

class Paddle {
  constructor(width = 75, height = 10, start, stroke, color) {
    this.width = width;
    this.height = height;
    this.start = start; // ???
    this.stroke = stroke;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.start, canvas.height - (this.height + 2), this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.stroke;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

export default Paddle;