document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restart');
    let isXTurn = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] !== '' || checkWinner()) {
            return;
        }

        boardState[index] = isXTurn ? 'X' : 'O';
        cell.textContent = boardState[index];
        if (checkWinner()) {
            message.textContent = `${isXTurn ? 'X' : 'O'} wins!`;
        } else if (boardState.every(cell => cell !== '')) {
            message.textContent = 'Draw!';
        } else {
            isXTurn = !isXTurn;
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === (isXTurn ? 'X' : 'O');
            });
        });
    }

    function restartGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });
        message.textContent = '';
        isXTurn = true;
    }
});
