var socket;
var id;
var edge = 30;
var boxW;
var boxH;
var hi;
var bye;
var type;
var showU;
var showOpp;
var turn = 0;
var moves = [];
// var occupied = [];
var xs = [];
var os = [];
var txt = "";
var wins = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9]
];

function setup() {

  createCanvas(400, 450);
  socket = io()
  background(51);
  socket.on('getID', setID);
  boxW = (width - edge * 2) / 3;
  boxH = (width - edge * 2) / 3;
  // bye = new O(3);
  // hi = new X(9);
  socket.on('mouse', trackOpp);
  socket.on('turn', turnUpdate);
  showOpp = new Play(0, type);
  // moves.push(new Play(1, type));
  // occupied.push(1);
  socket.on('addMove', addMove);
}

function addMove(data) {
  moves.push(new Play(data.p, data.type));
  if (data.type == 0) {
    xs.push(data.p);
  } else {
    os.push(data.p);
  }
}

function turnUpdate(data) {
  turn = 1 - turn;

}

function setID(data) {
  id = data;
  // console.log(id);
  type = id;
  if (id == 0) {
    txt = "Player X";
  } else if (id == 1) {
    txt = "Player O";
  } else {
    txt = "Observer"
  }
  hi = new Play(9, type);
}

function trackOpp(data) {
  stroke(90);
  // console.log(data);
  showOpp = new Play(data.p, data.type);

}

// function mouseDragged() {
//   if (id < 2) {
//     var data = {
//       x : mouseX,
//       y : mouseY
//     }
//
//     socket.emit('mouse', data);
//
//     stroke(255);
//     fill(255);
//     circle(mouseX, mouseY, 10);
//   }
// }

function inSq() {
  var x = mouseX - edge;
  var y = mouseY - edge;
  if (x > 0 && x < width - 2 * edge && y > 0 && y < width - 2 * edge) {
    place = 3 * (Math.floor(y / boxH)) + Math.floor(x / boxW) + 1;
    // console.log(3*(Math.floor(y/boxH))+Math.floor(x/boxW)+1);
    if (!os.includes(place) && !xs.includes(place)) {
      return place;
    } else {
      return 0;
    }
  } else {
    return 0;
  }

}

function moveMaybe() {
  if (id == turn) {
    stroke(90);
    showU = new Play(inSq(), type);
    showU.show();
    data = {
      p: showU.p,
      type: showU.type
    }
    socket.emit('mouse', data);
  }
}

function mouseClicked() {
  if (id == turn && inSq() != 0) {
    turn = 1 - turn;
    socket.emit('turn', 0);

    data = {
      p: inSq(),
      type: type
    }
    // addMove(data);
    socket.emit('addMove', data);
  }
}

function checkWin() {
  over = false;
  for (win of wins) {
    maybe = true;
    for (place of win) {
      if (!xs.includes(place)) {
        maybe = false;
        // console.log("X: " + place);
      }
    }
    if (maybe) {
      over = true;
      for (place of win) {
        if (!os.includes(place)) {
          maybe = false;
          // console.log("O: " + place);
        }
      }
      if (maybe) {
        over = true;
      }
    }
  }
  if (over) {
    if (moves.length % 2 == 0) {
      if (id == 0) {
        txt = "You Lose!";
      } else if (id == 1) {
        txt = "You Win!";
      } else {
        txt = "Player O Wins!"
      }
    } else {
      if (id == 1) {
        txt = "You Lose!";
      } else if (id == 0) {
        txt = "You Win!";
      } else {
        txt = "Player X Wins!"
      }
    }
    noLoop();
  } else if (moves.length == 9) {
    txt = "Cat's Game";
    noLoop();
  }
}

function draw() {
  background(51);
  stroke(255);
  strokeWeight(5);
  line(boxW + edge, edge, boxW + edge, width - edge);
  line(boxW * 2 + edge, edge, boxW * 2 + edge, width - edge);
  line(edge, boxH + edge, width - edge, boxH + edge);
  line(edge, boxH * 2 + edge, width - edge, boxH * 2 + edge);
  // hi.show();
  // bye.show();
  moveMaybe();
  stroke(90);
  if (turn == showOpp.type) {
    showOpp.show();
  }
  // socket.on('mouse', trackOpp);
  stroke(255);
  for (p of moves) {
    p.show();
  }
  checkWin();
  fill(255);
  noStroke();
  textSize(40);
  textAlign(CENTER, BOTTOM);
  text(txt, width / 2, width + 35);


}
