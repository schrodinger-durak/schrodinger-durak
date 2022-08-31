class Play {

  constructor(p, type) {
    this.type = type;
    this.p = p;
    if (type == 0) {
      this.play = new X(p);
    } else {
      this.play = new O(p);
    }

  }

  show() {

    this.play.show();
  }


}
