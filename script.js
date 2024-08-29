// Select all cells on the board, status display, and reset button
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// Initialize game variables
let currentPlayer = 'X'; // The current player (X or O)
let board = ['', '', '', '', '', '', '', '', '']; // Array to track the state of the board
let isGameActive = true; // Boolean to check if the game is active

// Define the winning conditions (index combinations that represent winning lines)
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Function to handle cell clicks
function handleClick(event) {
    const cell = event.target; // Get the clicked cell
    const cellIndex = Array.from(cells).indexOf(cell); // Get the index of the clicked cell

    // If the cell is already filled or the game is not active, ignore the click
    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    // Update the cell and check the result of the move
    updateCell(cell, cellIndex);
    checkResult();
}

// Function to update the cell with the current player's symbol
function updateCell(cell, index) {
    board[index] = currentPlayer; // Update the board array
    cell.textContent = currentPlayer; // Display the player's symbol in the cell
}

// Function to check if there is a winner or if the game is a tie
function checkResult() {
    let roundWon = false;

    // Loop through the winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i]; // Get the indices of the winning condition
        // Check if all three cells match the current player's symbol
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true; // Set roundWon to true if a winning condition is met
            break; // Exit the loop
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`; // Update status to show the winner
        isGameActive = false; // End the game
    } else if (!board.includes('')) {
        statusText.textContent = `It's a tie!`; // Update status if the game is a tie
        isGameActive = false; // End the game
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        statusText.textContent = `Player ${currentPlayer}'s turn`; // Update status to show the next player's turn
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X'; // Reset the current player to X
    board = ['', '', '', '', '', '', '', '', '']; // Clear the board array
    isGameActive = true; // Set the game as active again
    statusText.textContent = `Player X's turn`; // Reset the status text
    cells.forEach(cell => (cell.textContent = '')); // Clear all cells on the board
}

// Add event listeners to all cells and the reset button
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
