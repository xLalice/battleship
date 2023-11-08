function placeShip(ship, startRow, startCol, isHorizontal, board){
    if (startRow < 0 || starRow > 9 || startCol < 0 || startCol > 0){
        return;
    }

    if (isHorizontal){
        for (let i = 0; i < ship.length; i++){
            board[startRow][i] = "S";
        }
    } else {
        for (let i = 0; i < ship.length; i++){
            board[i][startCol] = "S"
        }
    }
    
}

class Gameboard{
    constructor(){
        this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    }
    const board = ;
    const ships = [];
    const missedAttacks = [];

}