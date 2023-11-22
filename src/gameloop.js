import Player from "./player";
import Gameboard from "./gameboard";
import { clearContent } from "./view";

export function gameLoop(){
    const player1 = new Player("Human", new Gameboard());
    const player2 = new Player("Computer", new Gameboard());

    player1.placeShipsRandomly();
    player2.placeShipsRandomly();
    renderBoards(player1, player2);

        
    document.getElementById('computer-board').addEventListener('click', (event) => {
        if (event.target.classList.contains('box')) {
            handleCellClick(event, player1, player2);
            renderBoards(player1, player2);
        }
    });
}

function handleCellClick(event, currentPlayer, opponentPlayer) {
    event.stopPropagation();
    const clickedCell = event.target;
    const row = parseInt(clickedCell.dataset.row);
    const col = parseInt(clickedCell.dataset.col);

    if (clickedCell.classList.contains('clicked')) {
        return;
    }
    clickedCell.classList.add("clicked");
    currentPlayer.makeMove(row, col, opponentPlayer);
    opponentPlayer.makeRandomMove(currentPlayer.gameboard);

    if (gameOver(currentPlayer, opponentPlayer)) {
        announceWinner(currentPlayer, opponentPlayer);
        clearContent();
    }
}



function gameOver(player1, player2){
    if (player1.allShipsSunk() || player2.allShipsSunk()){
        return true;
    }
    return false;
}

function announceWinner(player1, player2){
    if (player1.allShipsSunk()){
        console.log(`${player2.name} wins!`)
    } else{
        console.log(`${player1.name} wins!`)
    }
}

function renderPlayerBoard(player){
    const parent = document.querySelector("#content")
    const board = player.gameboard.board;
    let boardDiv = parent.querySelector("#player-board");

    if (!boardDiv) {
        boardDiv = document.createElement("div");
        boardDiv.classList.add("board");
        boardDiv.id = "player-board";
        parent.appendChild(boardDiv);
    }
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let box = boardDiv.querySelector(`.box[data-row="${i}"][data-col="${j}"]`);
            if (!box) {
                box = document.createElement("div");
                box.classList.add("box");
                box.dataset.row = i;
                box.dataset.col = j;
                boardDiv.appendChild(box);
            }

            box.className = "box";
            if (board[i][j] === null) {
                box.classList.add("null");
            } else if (board[i][j] === "O") {
                box.classList.add("water");
            } else if (board[i][j] === "X") {
                box.classList.add("hit");
            } else {
                box.classList.add("ship");
            }
        }
    }
}

function renderComputerBoard(player) {
    const parent = document.querySelector("#content");
    const board = player.gameboard.board;

    // Check if the computer board element already exists
    let boardDiv = parent.querySelector("#computer-board");

    // If not, create the board element
    if (!boardDiv) {
        boardDiv = document.createElement("div");
        boardDiv.classList.add("board");
        boardDiv.id = "computer-board";
        parent.appendChild(boardDiv);
    }

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let box = boardDiv.querySelector(`.box[data-row="${i}"][data-col="${j}"]`);
            if (!box) {
                box = document.createElement("div");
                box.classList.add("box");
                box.dataset.row = i;
                box.dataset.col = j;
                boardDiv.appendChild(box);
            }

            box.className = "box";
            if (board[i][j] === null) {
                box.classList.add("null");
            } else if (board[i][j] === "O") {
                box.classList.add("water");
            } else if (board[i][j] === "X") {
                box.classList.add("hit");
            }
        }
    }
}


function renderBoards(human, computer) {
    renderPlayerBoard(human);
    renderComputerBoard(computer);
}