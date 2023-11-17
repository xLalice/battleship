import Ship from "./ship"

class Gameboard {
    constructor() {
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.ships = [];
        this.missedAttacks = [];
    }

    checkForCollision(ship, row, col, isHorizontal, board) {
        const numRows = board.length;
        const numCols = board[0].length;

        if (isHorizontal) {
            if (col + ship.length > numCols) {
                return true;
            }

            for (let i = col; i < col + ship.length; i++) {
                console.log(`Checking cell[${row}][${i}]: ${board[row][i]}`);
                if (board[row][i] !== null) {
                    console.log(true);
                    return true;
                }
            }
        } else {
            if (row + ship.length > numRows) {
                return true;
            }

            for (let i = row; i < row + ship.length; i++) {
                console.log(`Checking cell[${i}][${col}]: ${board[i][col]}`);
                if (board[i][col] !== null) {
                    console.log(true);
                    return true;
                }
            }
        }

        console.log(false);
        return false;
    }

    



    placeShip(ship, startRow, startCol, isHorizontal) {
        if (startRow < 0 || startRow > 9 || startCol < 0 || startCol > 9) {
            return null;
        }

        if (this.checkForCollision(ship, startRow, startCol, isHorizontal, this.board)){
            return null;
        }
        
        ship.position = [];
        if (isHorizontal) {
            if (ship.length + startCol - 1 > 9){
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
            if (ship.length + startRow - 1 > 9){
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