import Ship from "./ship";


describe('Ship', () => {
    let ship;
    beforeEach(() => {
        ship = new Ship(4);
    })

    it('should create a ship with specified length', () => {
        expect(ship.length).toBe(4);
    })

    it('should initially have 0 hits', () => {
        expect(ship.hits).toBe(0);
    })

    it('should not be sunk initially', () => {
        expect(ship.checkIfSunk()).toBe(false);
    })

    it("should sink when hit enough times", () => {
        for(let i = 0; i < ship.length; i++){
            ship.hit();
        }
        expect(ship.checkIfSunk()).toBe(true);
    })
})