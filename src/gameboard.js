import Ship from "./ship"

class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
        this.missedAttacks = [];
    }

    placeShip(ship, startRow, startCol, isHorizontal) {
        if (startRow < 0 || startRow > 9 || startCol < 0 || startCol > 9) {
            return;
        }

        ship.position = [];
        if (isHorizontal) {
            for (let i = 0; i < ship.length; i++) {
                this.board[startRow][startCol + i] = ship;
                ship.position.push({ row: startRow, col: startCol + i });
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
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
            this.missedAttacks.push([row, col]);
        }
    }

    allShipsSunk() {
        return this.ships.every((ship) => ship.checkIfSunk());
    }

    getMissedAttacks() {
        return this.missedAttacks;
    }
}

export default Gameboard;