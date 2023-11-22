function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function printBoard(board){
    for(let i = 0; i < 9; i++){
        let row;
        for(let j = 0; j < 9; j++){
            row += board[i][j];
        }
        console.log(row)
    }
}

export {getRndInteger, printBoard};