import { gameLoop } from "./gameloop";

export function startGame(parent){
    const content = `
    <div class="start">
        <button id="start-btn">Start Game</button>

        <h1> Navigate the Seas, Command the Skies: Battleship Mastery Awaits </h1>

        <div class="start--symbols">
            <div class="symbol--ship"><p>Ship</p></div>
            <div class="symbol--water"><p>Water</p></div>
            <div class="symbol--hit"><p>Hit</p></div>
        </div>
    </div>
    `
    parent.innerHTML = parent.innerHTML + content;

    document.querySelector("#start-btn").addEventListener("click", () => {
        clearContent();
        gameLoop();
    })
}

export function winner(playerName){
    clearContent();
    const winnerDiv = document.createElement("div");
    winnerDiv.className = "winner-div";
    const text = document.createElement("h1");
    if (playerName === "Computer"){
        text.textContent = "Sorry, You Lose.";
    } else {
        text.textContent = "Congratulations! You Win!"
    }

    const restartButton = document.createElement("button");
    restartButton.textContent = "Start Again";
    restartButton.className = "start-button";
    restartButton.addEventListener("click", () => {
        clearContent();
        gameLoop();
    })

    winnerDiv.appendChild(text);
    winnerDiv.appendChild(restartButton);   
    document.querySelector("#content").appendChild(winnerDiv);
}

export function clearContent(){
    const content = document.querySelector("#content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
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

export function renderBoards(human, computer) {
    renderPlayerBoard(human);
    setTimeout(renderComputerBoard(computer), 2);
}

