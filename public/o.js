class O {

  constructor(p) {
    this.p = p;
    this.x = boxW / 2 * (((p - 1) % 3) * 2 + 1) + edge;
    this.y = boxH / 2 * ((Math.floor((p - 1) / 3)) * 2 + 1) + edge;
    var space = 15;
    this.w = boxW - space * 2;
    this.h = boxH - space * 2;
  }

  show() {
    if (this.p > 0) {
      strokeWeight(10);
      noFill();
      ellipse(this.x, this.y, this.w, this.h);
    }

  }


}
