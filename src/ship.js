class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.isSunk = false
    }
    
    hit() {
        this.hits = this.hits + 1;
        this.checkIfSunk();
    }

    checkIfSunk() {
        return this.hits === this.length ? true : false;
    }
}



export default Ship;