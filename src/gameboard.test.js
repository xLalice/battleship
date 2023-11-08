import Gameboard from "./gameboard";
import Ship from "./ship"

describe('Gameboard', () => {
    let gameboard;
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
        gameboard = new Gameboard();
    })

    it('should place a ship on the board', () => {
        gameboard.placeShip(ship, 0, 0, true);
        expect(gameboard.board[0][0]).toBeInstanceOf(Ship);
        expect(gameboard.board[0][1]).toBeInstanceOf(Ship);
    })

    it('can receive an attack and hit ship', () => {
        gameboard.placeShip(ship, 0, 0, true);
        gameboard.receiveAttack(1, 1);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1,2)
        expect(gameboard.getMissedAttacks()).toContainEqual([1,1]);
        expect(gameboard.getMissedAttacks()).toContainEqual([1,2]);
        expect(gameboard.board[0][0]).toBe("X") 
    })

    it('should report if all ships are sunked', () => {
        let ship1 = new Ship(2);
        let ship2 = new Ship(3);
        gameboard.placeShip(ship1, 0, 0, true)
        gameboard.placeShip(ship2, 1, 0, true)

        gameboard.receiveAttack(0,0)
        gameboard.receiveAttack(0,1)
        gameboard.receiveAttack(1, 0)
        gameboard.receiveAttack(1, 1)
        gameboard.receiveAttack(1, 2)

        expect(gameboard.allShipsSunk()).toBe(true);
    })
})