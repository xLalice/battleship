import Ship from "../ship";
import Gameboard from "../gameboard";
import Player from "../player";

describe("Integration test", () => {
    beforeEach(() => {
        const player = new Player('Player1', new Gameboard());
    })

    test("Places a ship on the gameboard", ()=> {
        const ship = new Ship(3);
        player.placeShip(ship, 2, 3, true);
        expect(player.gameboard[2][3]).toBeInstanceOf(Ship);
        expect(player.gameboard[2][4]).toBeInstanceOf(Ship);
        expect(player.gameboard[2][5]).toBeInstanceOf(Ship);
    })

    test("Place 5 ships randomly works", () => {
        player.placeShipsRandomly();
        expect(placeShip).toBeCalled(5);
    })

    test("Makes moves/attacks properly", () => {
        const opponentGameboard = new Gameboard();
        player.makeMove(2, 3, opponentGameboard);
        expect(opponentGameboard).toBe("X");
    })

    test('Game loop ends when one player\'s ships are all sunk', () => {
        const player1 = new Player('Player1', new Gameboard());
        const player2 = new Player('Player2', new Gameboard());
      
        placeShipsRandomly(player1, [5, 4, 3, 3, 2]);
        placeShipsRandomly(player2, [5, 4, 3, 3, 2]);
      
        gameLoop(player1, player2);
      
        expect(gameOver(player1, player2)).toBe(true);
      });
})