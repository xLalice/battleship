import Ship from "./ship";
import {getRndInteger} from "./helpers";


class Player {
    constructor(playerName, gameboard){
        this.name = playerName;
        this.gameboard = gameboard;
    }

    makeMove(x, y, opponent){
        console.log(x, y, opponent)
        opponent.gameboard.receiveAttack(x, y);
    }

    makeRandomMove(board){
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);


        board.receiveAttack(x,y);
    }

    allShipsSunk(){
        return this.gameboard.allShipsSunk();
    }
    
    placeShipsRandomly() {
        const initialShipLengths = [5, 4, 3, 3, 2];
        for (let i = 0; i < initialShipLengths.length; i++) {
            let x = getRndInteger(0, 9);
            let y = getRndInteger(0, 9);
            let isHorizontal = Math.random() < 0.5;
    
            let ship = new Ship(initialShipLengths[i]);
            console.log(ship.length, x , y, isHorizontal)
            let placed = this.gameboard.placeShip(ship, x, y, isHorizontal);
            if (placed === null) {
                i--;
            } 
        }
    }
}

export default Player;