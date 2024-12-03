const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let gameActive = true;
let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Array of background colors
const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#85E3FF', '#B9FBC0', '#FF677D', '#D3C0DB'];
let colorIndex = 0;

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkResult();
    if (gameActive) {
        computerMove();
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `${currentPlayer} wins!`;
        gameActive = false;
        changeBackgroundColor();
        return;
    }

    if (!boardState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        gameActive = false;
        changeBackgroundColor();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Current Player: ${currentPlayer}`;
}

function computerMove() {
    let availableCells = boardState.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        boardState[randomIndex] = currentPlayer;
        document.querySelector(`[data-cell-index="${randomIndex}"]`).innerHTML = currentPlayer;
        checkResult();
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `Current Player: ${currentPlayer}`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

function changeBackgroundColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[colorIndex];
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

restartButton.addEventListener('click', restartGame);
createBoard();
statusDisplay.innerHTML = `Current Player: ${currentPlayer}`;
