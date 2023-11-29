import Player from "./player";
import Gameboard from "./gameboard";
import { clearContent, renderBoards, winner } from "./view";

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
        if (gameOver(player1, player2)) {
            clearContent();
            announceWinner(player1, player2);
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
}


function gameOver(player1, player2){
    if (player1.allShipsSunk() || player2.allShipsSunk()){
        return true;
    }
    return false;
}

function announceWinner(player1, player2){
    if (player1.allShipsSunk()){
        winner(player2.name);
    } else{
        winner(player1.name);
    }
}