class Lives {
  constructor(x, y, lives = 3, color = '#000000', font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.color = color;
    this.font = font;
  }

  decrease() {
    this.lives -= 1;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.y, 20);
  }
}

export default Lives;
