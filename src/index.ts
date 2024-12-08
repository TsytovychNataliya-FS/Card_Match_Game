import flipCardImage from "./assets/flip_card.png";
import "./styles/main.scss";

// Define the Card type
type Card = {
  id: number;
  value: string;
  matched: boolean;
  flipped?: boolean;
};

let attempts = 3;
let cards: Card[] = [];
let flippedCards: Card[] = [];
let gameOver = false;

const cardValues = ["A", "B", "C", "A", "B", "C"];
const grid = document.getElementById("card-grid")!;
const attemptsDisplay = document.getElementById("attempts")!;
const restartBtn = document.getElementById("restart-btn")!;

// Get the status display element
const gameStatus = document.getElementById("game-status")!;

// Function to display game status (You win or Game over)
function showGameStatus(message: string) {
  gameStatus.textContent = message;
  gameStatus.classList.add("visible"); // Show the message
}

// Shuffle the cards randomly
function shuffleCards(): void {
  cards = cardValues
    .map((value, index) => ({
      id: index,
      value,
      matched: false,
      flipped: false,
    }))
    .sort(() => Math.random() - 0.5); // Shuffle the cards randomly
  renderCards();
}

// Render the cards on the grid
function renderCards() {
  grid.innerHTML = ""; // Clear the grid before rendering
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    // Don't add the 'flipped' class initially; only when clicked
    if (card.flipped) {
      cardElement.classList.add("flipped");
    }

    if (card.matched) {
      cardElement.classList.add("matched");
    }

    cardElement.innerHTML = `
      <div class="back" style="background-image: url(${flipCardImage});"></div>
      <div class="front">${card.value}</div>
    `;

    // Add event listener to flip the card when clicked
    cardElement.addEventListener("click", () => flipCard(card));

    grid.appendChild(cardElement);
  });
}

// Flip the card
function flipCard(card: Card): void {
  if (flippedCards.length < 2 && !card.matched && !gameOver && !card.flipped) {
    card.flipped = true;
    flippedCards.push(card);
    renderCards();

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500); // Delay match check to allow card flipping animation
    }
  }
}

// Check if the flipped cards match
function checkMatch(): void {
  const [first, second] = flippedCards;

  if (first.value === second.value) {
    first.matched = true;
    second.matched = true;
  } else {
    attempts--;
    first.flipped = false;
    second.flipped = false;
  }

  flippedCards = []; // Clear flipped cards
  attemptsDisplay.textContent = attempts.toString(); // Update attempts display

  // Check for game over or win condition
  if (attempts === 0 || cards.every((card) => card.matched)) {
    endGame();
  }

  renderCards();
}

// End the game and display a message
function endGame(): void {
  gameOver = true;
  setTimeout(() => {
    // Check if the player won or the game is over
    const message = cards.every((card) => card.matched)
      ? "You win!"
      : "Game over!";
    showGameStatus(message); // Display the message on the page
    startGame(); // Automatically restart the game
  }, 1000);
}

// Start a new game
function startGame(): void {
  attempts = 3;
  gameOver = false;
  flippedCards = [];
  shuffleCards();
  attemptsDisplay.textContent = attempts.toString();
}

// Event listener to restart the game
document.addEventListener("DOMContentLoaded", () => {
  restartBtn.addEventListener("click", startGame);
  startGame(); // Start the game immediately once the DOM is loaded
});
