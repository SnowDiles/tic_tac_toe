function player(name, marker, score) {
  this.name = name;
  this.marker = marker;
  this.score = score;

  this.info = `Ce joueur s'appelle : ${name} il est le joueur : ${marker} et il a ${score} point`;
}
let name1 = prompt("Veuillez saisir le pseudo du joueur X : ");
let name2 = prompt("Veuillez saisir le pseudo du joueur O : ");

let currentPlayer = "X";
// @ts-ignore
document.getElementById("firstText").innerText = currentPlayer;
let player1 = new player(name1, "X", 0);

let player2 = new player(name2, "O", 0);
displayScore();

let gameboard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function displayBoard(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i].join(" | "));
  }
}

function turn(actualplayer) {
  if (actualplayer === "X") {
    currentPlayer = "O";
    console.log(`C'est au tour de ${player2.name} de jouer`);
    return;
  }

  if (actualplayer === "O") {
    currentPlayer = "X";
    console.log(`C'est au tour de ${player1.name} de jouer`);
    return;
  }
}

function play(row, column) {
  if (checkWinner(gameboard)) {
    resetGameboard(gameboard);
    console.log("Quelqu'un vient de gagner");
    return;
  }
  checkEquality(gameboard);

  position(row, column);
  displayArray(gameboard);
  turn(currentPlayer);
  // @ts-ignore
  document.getElementById("firstText").innerText = currentPlayer;

  if (checkWinner(gameboard)) {
    resetGameboard(gameboard);
    displayArray(gameboard);
    if (player1.score === 5 || player2.score === 5) {
      winnerScreen();
    }
    displayScore();
    return;
  }
  if (checkEquality(gameboard) === "true") {
    resetGameboard(gameboard);
    displayArray(gameboard);
    console.log("egalité");
    return;
  }
  displayScore();
}

function position(x, y) {
  if (gameboard[x][y] === "") {
    if (currentPlayer === "X") {
      gameboard[x][y] = "X";
      displayBoard(gameboard);
      return;
    }
    if (currentPlayer === "O") {
      gameboard[x][y] = "O";
      displayBoard(gameboard);
      return;
    }
  } else {
    console.log("Emplacement deja pris");
  }
}

function checkWinner(array) {
  // Vérification pour le joueur 1 (symbole "X")
  if (
    (array[0][0] === "X" && array[0][1] === "X" && array[0][2] === "X") ||
    (array[1][0] === "X" && array[1][1] === "X" && array[1][2] === "X") ||
    (array[2][0] === "X" && array[2][1] === "X" && array[2][2] === "X") ||
    (array[0][0] === "X" && array[1][0] === "X" && array[2][0] === "X") ||
    (array[0][1] === "X" && array[1][1] === "X" && array[2][1] === "X") ||
    (array[0][2] === "X" && array[1][2] === "X" && array[2][2] === "X") ||
    (array[0][0] === "X" && array[1][1] === "X" && array[2][2] === "X") ||
    (array[0][2] === "X" && array[1][1] === "X" && array[2][0] === "X")
  ) {
    player1.score++;
    console.log(
      `Le joueur : ${player1.name} a gagné et a maintenant ${player1.score} point !!`
    );
    resetGameboard(gameboard);
    return "true";
  }

  // Vérification pour le joueur 2 (symbole "O")
  if (
    (array[0][0] === "O" && array[0][1] === "O" && array[0][2] === "O") ||
    (array[1][0] === "O" && array[1][1] === "O" && array[1][2] === "O") ||
    (array[2][0] === "O" && array[2][1] === "O" && array[2][2] === "O") ||
    (array[0][0] === "O" && array[1][0] === "O" && array[2][0] === "O") ||
    (array[0][1] === "O" && array[1][1] === "O" && array[2][1] === "O") ||
    (array[0][2] === "O" && array[1][2] === "O" && array[2][2] === "O") ||
    (array[0][0] === "O" && array[1][1] === "O" && array[2][2] === "O") ||
    (array[0][2] === "O" && array[1][1] === "O" && array[2][0] === "O")
  ) {
    player2.score++;
    console.log(
      `Le joueur : ${player2.name} a gagné et a maintenant ${player2.score} point !!`
    );
    resetGameboard(gameboard);
    return "true";
  }
}

function resetGameboard(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      array[i][j] = "";
    }
  }

  // displayBoard(gameboard);
}

function getScore() {
  console.log(player1.score);
}

function checkEquality(array) {
  let checking = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[i][j] !== "") {
        checking++;
      }
    }
  }

  if (checking === 9) {
    return "true";
  }
}

function displayArray(array) {
  // @ts-ignore
  document.getElementById("pCell1").innerText = array[0][0];
  // @ts-ignore
  document.getElementById("pCell2").innerText = array[0][1];
  // @ts-ignore
  document.getElementById("pCell3").innerText = array[0][2];
  // @ts-ignore
  document.getElementById("pCell4").innerText = array[1][0];
  // @ts-ignore
  document.getElementById("pCell5").innerText = array[1][1];
  // @ts-ignore
  document.getElementById("pCell6").innerText = array[1][2];
  // @ts-ignore
  document.getElementById("pCell7").innerText = array[2][0];
  // @ts-ignore
  document.getElementById("pCell8").innerText = array[2][1];
  // @ts-ignore
  document.getElementById("pCell9").innerText = array[2][2];
}

function displayScore() {
  // @ts-ignore
  document.getElementById("Xscore").innerText = player1.score;

  // @ts-ignore
  document.getElementById("Oscore").innerText = player2.score;
}

function winnerScreen() {
  // @ts-ignore
  document.getElementById("winnerScreen").style.display = "block";
  if (player1.score === 5) {
    // @ts-ignore
    document.getElementById("nameWinner").innerText = player1.name;
  } else if (player2.score === 5) {
    // @ts-ignore
    document.getElementById("nameWinner").innerText = player2.name;
  }
}
