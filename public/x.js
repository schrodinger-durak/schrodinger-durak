class X {
  constructor(p) {
    this.p = p;
    this.x = boxW / 2 * (((p - 1) % 3) * 2 + 1) + edge;
    this.y = boxH / 2 * ((Math.floor((p - 1) / 3)) * 2 + 1) + edge;
    var space = 15;
    this.halfW = (boxW - space * 2) / 2;
    this.halfH = (boxH - space * 2) / 2;
  }

  show() {
    if (this.p > 0) {
      strokeWeight(10);
      line(this.x - this.halfW, this.y - this.halfH, this.x + this.halfW, this.y + this.halfH);
      line(this.x + this.halfW, this.y - this.halfH, this.x - this.halfW, this.y + this.halfH);
      // circle(this.x,this.y,10);
    }

  }


}
