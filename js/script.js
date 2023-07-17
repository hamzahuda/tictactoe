"use strict";

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

    const getBoard = () => _board;

    const reset = () => {
        _board = new Array(9);
        _marksAdded = 0;
    };

    return { addMark, reset, getBoard };
})();

const playerFactory = (name, mark) => {
    const name = name;
    const _mark = mark;
    const _score = 0;

    const getMark = () => _mark;
    const getScore = () => _score;
    const incrementScore = () => _score++;
    const resetScore = () => {
        _score = 0;
    };

    return { getMark, incrementScore, getScore, resetScore, name };
};

const gameController = (() => {
    const playerOne = playerFactory("Player One", "X");
    const playerTwo = playerFactory("Player Two", "O");
    let activePlayer = playerOne;

    const getScores = () => {
        return [playerOne.getScore(), playerTwo.getScore()];
    };

    const _switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const playRound = (position) => {
        gameBoard.addMark(activePlayer.getMark(), position);
        _switchActivePlayer();
    };

    const _checkForWinner = () => {
        const board = gameBoard.getBoard();

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
                board[winningPos[0]] === board[winningPos[1]] &&
                board[winningPos[0]] === board[winningPos[2]]
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

    return { playRound, getScores, checkForWinOrTie, playerOne, playerTwo };
})();

const displayController = (() => {
    return {};
})();
