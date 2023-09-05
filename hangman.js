// hangman.js

// Define your list of words here
const wordList = ["apple", "banana", "cherry", "grape", "kiwi", "orange", "strawberry", "watermelon"];

let secretWord = "";
let guessedLetters = [];
let attempts = 6; // Customize the number of attempts

// Function to choose a random word from the list
function chooseRandomWord() {
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];
}

// Function to display the current state of the word with underscores
function displayWord() {
    let displayedWord = "";
    for (const letter of secretWord) {
        if (guessedLetters.includes(letter)) {
            displayedWord += letter;
        } else {
            displayedWord += "_";
        }
    }
    return displayedWord;
}

// Function to check if the player has won
function hasPlayerWon() {
    return secretWord === displayWord();
}

// Function to check if the player has lost
function hasPlayerLost() {
    return attempts === 0;
}

// Event listener for button clicks
function handleLetterButtonClick(event) {
    const letter = event.target.textContent.toLowerCase();
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        event.target.disabled = true; // Disable the button after clicking
        if (!secretWord.includes(letter)) {
            attempts--;
        }
        updateGameStatus();
    }
}

// Function to update the game status (word display, messages, win/lose conditions)
function updateGameStatus() {
    const wordDisplay = document.getElementById("word-display");
    const message = document.getElementById("message");

    wordDisplay.textContent = displayWord();

    if (hasPlayerWon()) {
        message.textContent = "Congratulations! You guessed the word!";
        message.style.color = "#5bc0de"; // Blue color for win message
    } else if (hasPlayerLost()) {
        message.textContent = `Sorry, you ran out of attempts. The word was: ${secretWord}`;
        message.style.color = "#d9534f"; // Red color for lose message
    }
}

// Initialize the game
function initGame() {
    chooseRandomWord();
    updateGameStatus();

    const letterButtons = document.querySelectorAll("#letter-buttons button");
    letterButtons.forEach(button => {
        button.addEventListener("click", handleLetterButtonClick);
    });
}

// Start the game when the page loads
window.onload = initGame;
