import Player from "./player";

jest.mock('./gameboard', () => {
    return {
        Gameboard: jest.fn(() => ({
            receiveAttack: jest.fn(),
            allShipsSunk: jest.fn(),
            receiveAttack: jest.fn()
        })),
        Ship: jest.fn(() => ({
            isSunk: jest.fn(),
        })),
    };
});

describe("Player class", () => {
    let playerGameboard;
    let computerGameboard;
    let humanPlayer;
    let computerPlayer;

    beforeEach(() => {
        playerGameboard = new (require('./gameboard.js').Gameboard)();
        computerGameboard = new (require('./gameboard.js').Gameboard)();

        humanPlayer = new Player('Human', computerGameboard);
        computerPlayer = new Player('Computer', playerGameboard);
    })

    test('human player makes a move', () => {
        humanPlayer.makeMove(0, 0);

        expect(computerGameboard.receiveAttack).toHaveBeenCalledWith(0, 0);
    });

    test('computer player makes a random move', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        computerPlayer.makeRandomMove();

        expect(playerGameboard.receiveAttack).toHaveBeenCalled();

        jest.spyOn(Math, 'random').mockRestore();
    });

    test('player knows when all ships are sunk', () => {
        const opponentGameboard = new (require('./gameboard').Gameboard)();
        opponentGameboard.allShipsSunk.mockReturnValue(true);
        const humanPlayer = new Player('Human', opponentGameboard);
        const humanResult = humanPlayer.allShipsSunk();
        expect(opponentGameboard.allShipsSunk).toHaveBeenCalled();
        expect(humanResult).toBe(true);
    });
})