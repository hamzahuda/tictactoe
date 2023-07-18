"use strict";

const gameBoard = (() => {
    let _board = new Array(9);
    let marksAdded = 0;

    const addMark = (mark, position) => {
        if ((mark === "X" || mark === "O") && position >= 0 && position <= 8) {
            if (_board[position] === undefined) {
                _board[position] = mark;
                gameBoard.marksAdded++;
                gameController.switchActivePlayer();
            }
        }
    };

    const getBoard = () => _board;

    const reset = () => {
        _board = new Array(9);
        gameBoard.marksAdded = 0;
    };

    return { addMark, reset, getBoard, marksAdded };
})();

const playerFactory = (name, mark) => {
    this.name = name;
    const _mark = mark;

    const getMark = () => _mark;

    return { getMark, name };
};

const gameController = (() => {
    const players = [
        playerFactory("Player One (X)", "X"),
        playerFactory("Player Two (O)", "O"),
    ];
    let activePlayer = players[0];
    let matchOver = false;

    const switchActivePlayer = () => {
        if (gameController.activePlayer === players[0]) {
            gameController.activePlayer = players[1];
        } else {
            gameController.activePlayer = players[0];
        }
    };

    const playRound = (position) => {
        gameBoard.addMark(gameController.activePlayer.getMark(), position);
    };

    const _checkForWinner = () => {
        const board = gameBoard.getBoard();
        let winner = null;

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
                board[winningPos[1]] === board[winningPos[2]] &&
                board[winningPos[0]] !== undefined
            ) {
                winner = board[winningPos[0]];
            }
        });

        return winner;
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

    return {
        playRound,
        checkForWinOrTie,
        players,
        activePlayer,
        switchActivePlayer,
        matchOver,
    };
})();

const displayController = (() => {
    let infobox = `${gameController.activePlayer.name}'s Turn`;

    const updateDisplay = () => {
        let index = 0;
        document.querySelectorAll(".cell").forEach((cell) => {
            const mark = gameBoard.getBoard()[index];
            if (mark === "X" || mark === "O") {
                cell.textContent = mark;
            } else {
                cell.textContent = "";
            }
            index++;
        });

        document.querySelectorAll(".name").forEach((name, index) => {
            name.value = gameController.players[index].name;
        });

        if (gameController.matchOver === false) {
            infobox = `${gameController.activePlayer.name}'s Turn`;
        }

        document.getElementById("infobox").textContent = infobox;
    };

    window.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".cell").forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if (gameController.matchOver === false) {
                    gameController.playRound(index);

                    const gameEnded = gameController.checkForWinOrTie();
                    if (gameEnded) {
                        gameController.matchOver = true;
                        if (gameEnded === "TIE") {
                            infobox = "This match is a tie!";
                        } else if (gameEnded === "X") {
                            infobox = `${gameController.players[0].name} wins!`;
                        } else {
                            infobox = `${gameController.players[1].name} wins!`;
                        }
                    }

                    updateDisplay();
                }
            });
        });

        document.querySelectorAll(".name").forEach((name, index) => {
            name.addEventListener("input", () => {
                gameController.players[index].name = name.value;
                updateDisplay();
            });
        });

        document.getElementById("newgame").addEventListener("click", () => {
            gameController.matchOver = false;
            gameBoard.reset();
            updateDisplay();
        });

        updateDisplay();
    });
})();
