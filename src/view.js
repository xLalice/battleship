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

export function clearContent(){
    const content = document.querySelector("#content");
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

