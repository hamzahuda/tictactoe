const gameBoard = (() => {
    const _board = new Array(9);
    let _marksAdded = 0;

    const addMark = (mark, position) => {
        if ((mark === "X" || mark === "O") && position >= 0 && position <= 8) {
            if (_board[position] === undefined) {
                _board[position] = mark;
                _marksAdded++;
            }
        }
    };

    const _checkForWinner = () => {
        const winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        winningPositions.forEach((winningPos) => {
            if (
                _board[winningPos[0]] === _board[winningPos[1]] &&
                _board[winningPos[0]] === _board[winningPos[2]]
            ) {
                return winningPos[0];
            }
        });

        return false;
    };

    /* 
    Returns "X" or "O" if there's a winner
    Returns "TIE" if it's a tie
    Returns false if the game hasn't ended 
    */
    const checkForWinOrTie = () => {
        const winner = _checkForWinner();
        if (winner) {
            return winner;
        } else if (_marksAdded === 9) {
            return "TIE";
        } else {
            return false;
        }
    };

    const reset = () => {
        _board = new Array(9);
        _marksAdded = 0;
    };

    return { addMark, reset, checkForWinOrTie };
})();

const game = (() => {
    return {};
})();

const displayController = (() => {
    return {};
})();
