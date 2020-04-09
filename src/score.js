class Score {
  constructor(score = 0, color = '#000000', font = '16px Arial') {
    this.score = score;
    this.color = color;
    this.font = font;
  }

  increase() {
    this.score += 1;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}

export default Score;
