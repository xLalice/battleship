import Ship from "./ship"

class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
        this.missedAttacks = [];
    }

    checkForCollision(length, startRow, startCol, isHorizontal){
        if (isHorizontal){
            for (let i = 0; i < length; i++){
                if (this.board[startRow][startCol + i] !== null){
                    return true;
                }
            }
            return false;
        } else {
            for (let i = 0; i < length; i++){
                if (this.board[startRow + i][startCol] !== null){
                    return true;
                }
            }
            return false;
        }
    }

    placeShip(ship, startRow, startCol, isHorizontal) {
        if ((startRow < 0 || startRow > 9 || startCol < 0 || startCol > 9) 
                && this.checkForCollision(ship.length, startRow, startCol, isHorizontal)) {
            return null;
        }
        
        ship.position = [];
        if (isHorizontal) {
            if (ship.length + startCol > 9){
                return null;
            }
            for (let i = 0; i < ship.length; i++) {
                if (this.board[startRow][startCol+i] !== null){
                    return null;
                }
                this.board[startRow][startCol + i] = ship;
                ship.position.push({ row: startRow, col: startCol + i });
            }
        } else {
            if (ship.length + startRow > 9){
                return null;
            }
            for (let i = 0; i < ship.length; i++) {
                if (this.board[startRow+ i][startCol] !== null){
                    return null;
                }
                this.board[startRow + i][startCol] = ship;
                ship.position.push({ row: startRow + i, col: startCol });
            }
        }
        this.ships.push(ship);
    }

    receiveAttack(row, col) {
        const target = this.board[row][col];

        if (target instanceof Ship) {
            target.hit();
            this.board[row][col] = 'X'; 
        } else {
            this.board[row][col] = 'O';
            this.missedAttacks.push([row, col]);
        }
    }

    allShipsSunk() {
        return this.ships.every((ship) => ship.checkIfSunk());
    }

    getMissedAttacks() {
        return this.missedAttacks;
    }

    getBoard(){
        console.table(this.board);
    }
}

export default Gameboard;