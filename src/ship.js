class Ship {
    constructor(length){
        this.length = length;
        this.hits = 0;
        this.isSunk = false,
        this.position = [];
    }
    
    hit() {
        this.hits = this.hits + 1;
    }

    checkIfSunk() {
        return this.hits === this.length ? true : false;
    }
}

export default Ship;