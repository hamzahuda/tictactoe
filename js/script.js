"use strict";

const gameBoard = (() => {
    const _board = new Array(9);
    let marksAdded = 0;

    const addMark = (mark, position) => {
        if ((mark === "X" || mark === "O") && position >= 0 && position <= 8) {
            if (_board[position] === undefined) {
                _board[position] = mark;
                marksAdded++;
            }
        }
    };

    const getBoard = () => _board;

    const reset = () => {
        _board = new Array(9);
        marksAdded = 0;
    };

    return { addMark, reset, getBoard, marksAdded };
})();

const playerFactory = (name, mark) => {
    this.name = name;
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
    const players = [
        playerFactory("Player One", "X"),
        playerFactory("Player Two", "O"),
    ];
    let activePlayer = players[0];

    const getScores = () => {
        return [players[0].getScore(), players[1].getScore()];
    };

    const _switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
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
        } else if (gameBoard.marksAdded === 9) {
            return "TIE";
        } else {
            return false;
        }
    };

    return { playRound, getScores, checkForWinOrTie, players };
})();

const displayController = (() => {
    const updateDisplay = () => {
        let index = 0;
        document.querySelectorAll(".cell").forEach((cell) => {
            const mark = gameBoard.getBoard()[index];
            if (mark === "X" || mark === "O") {
                cell.textContent = mark;
            }
            index++;
        });
        document.getElementById("nameone").value =
            gameController.players[0].name;
        document.getElementById("nametwo").value =
            gameController.players[1].name;
    };

    window.addEventListener("DOMContentLoaded", () => {
        updateDisplay();

        document.querySelectorAll(".cell").forEach((cell, index) => {
            cell.addEventListener("click", () => {
                gameController.playRound(index);
                const gameEnd = gameController.checkForWinOrTie();
                if (gameEnd) {
                    if (gameEnd === "X") {
                    }
                }
                updateDisplay();
            });
        });

        document.getElementById("nameone").addEventListener("input", () => {
            gameController.players[0] =
                document.getElementById("nameone").value;
        });
        document.getElementById("nametwo").addEventListener("input", () => {
            gameController.players[1] =
                document.getElementById("nametwo").value;
        });
    });
})();
