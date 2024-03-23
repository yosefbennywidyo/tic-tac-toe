import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  // Define controller targets
  static targets = ["tile", "playerDisplay", "announcer", "resetButton", "endTurnButton"];
  
  initialize() {
    // Initialize game state variables
    this.board = Array(9).fill(''); // Initialize game board
    this.players = ['X', 'O']; // Define players symbol
    this.winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ]; // Define winning conditions
    this.activePlayerIndex = 0; // Initialize active player index
    this.isGameActive = true; // Initialize game state (active/inactive)
    this.moveMade = false; // Track if a move has been made
    this.generateTiles(); // Generate game tiles
    this.renderPlayerDisplay(); // Render initial player display
  }
  
  // Generate game tiles
  generateTiles() {
    const container = this.targets.find('ticTacToeBoard'); // Get tile container
    const template = document.createElement('template'); // Create template element
    template.innerHTML = `
      <div class="tile" data-tic-tac-toe-target="tile" data-action="click->tic-tac-toe#handleTileClick"></div>
    `; // Define tile template

    // Create tiles and append to container
    for (let i = 0; i < 9; i++) {
      const tile = template.content.firstElementChild.cloneNode(true); // Clone tile template
      tile.dataset.index = i; // Set tile index
      container.appendChild(tile); // Append tile to container
    }
  }
  
  // Render player display
  renderPlayerDisplay() {
    // Get player names from data attributes
    const firstPlayerName = this.element.dataset.firstPlayerName;
    const secondPlayerName = this.element.dataset.secondPlayerName;
    var currentPlayerName = ''

    // Determine current player's name
    if (this.players[this.activePlayerIndex] === 'X') {
        currentPlayerName = firstPlayerName;
    } else {
        currentPlayerName = secondPlayerName;
    }

    // Update player display if game is active
    if (this.isGameActive) {
      const currentPlayer = this.players[this.activePlayerIndex];
      this.playerDisplayTarget.innerHTML = `It's <span class="display player${currentPlayer}">${currentPlayerName}</span>'s turn`;
    }
  }
  
  // Handle tile click event
  handleTileClick(event) {
    // Check if game is active
    if (!this.isGameActive) {
      this.renderNotification("Game is over, please reset");
      return;
    }
    
    const tile = event.currentTarget; // Get clicked tile
    const index = parseInt(tile.dataset.index); // Get tile index

    // Check if tile is empty
    if (!this.isTileEmpty(tile)) {
      this.renderNotification("This tile is already occupied!");
      return;
    }

    // Check if a move has already been made
    if (this.moveMade) {
      this.renderNotification("You can only select one tile before ending your turn.");
      return;
    }

    // Update game board and handle result validation
    this.moveMade = true;
    this.updateBoard(index);
    this.handleResultValidation();
  }

  // Check if tile is empty
  isTileEmpty(tile) {
    return tile.innerText === '';
  }

  // Update game board
  updateBoard(index) {
    this.board[index] = this.players[this.activePlayerIndex];
    this.updateTileDisplay(index);
  }

  // Update tile display
  updateTileDisplay(index) {
    const tile = this.tileTargets.find((t) => parseInt(t.dataset.index) === index);
    tile.innerText = this.players[this.activePlayerIndex];
    tile.classList.add(`player${this.players[this.activePlayerIndex]}`);
  }

  // Handle result validation
  handleResultValidation() {
    for (const condition of this.winningConditions) {
      const [a, b, c] = condition.map(index => this.board[index]);
      if (a && a === b && b === c) {
        this.announceWinner(this.players[this.activePlayerIndex]);
        this.playerDisplayTarget.innerHTML = "Game Over";
        this.isGameActive = false;
        this.endTurnButtonTarget.classList.add("disabled");
        return;
      }
    }
    if (!this.board.includes('')) {
      this.announceTie();
      this.isGameActive = false;
    }
  }

  // Switch active player
  switchPlayer() {
    this.activePlayerIndex = (this.activePlayerIndex + 1) % 2;
    this.renderPlayerDisplay();
  }

  // Announce winner
  announceWinner(winner) {
    const firstPlayerName = this.element.dataset.firstPlayerName;
    const secondPlayerName = this.element.dataset.secondPlayerName;
    var winningPlayerName = ''

    if (winner === 'X') {
        winningPlayerName = firstPlayerName;
    } else {
        winningPlayerName = secondPlayerName;
    }

    this.announcerTarget.innerHTML = `Congrats <span class="player${winner}">${winningPlayerName}</span>, you won`;
    this.announcerTarget.classList.remove('hide');
    this.endTurnButtonTarget.classList.add("disabled");
  }

  // Announce tie
  announceTie() {
    this.announcerTarget.innerText = 'Tie';
    this.announcerTarget.classList.remove('hide');
    this.playerDisplayTarget.innerHTML = "Game Over";
    this.endTurnButtonTarget.classList.add("disabled");
  }

  // Check if player is first player
  isFirstPlayer(playerIndex) {
    return playerIndex % 2 === 0;
  }

  // Handle game reset
  handleReset() {
    this.board = Array(9).fill('');
    this.isGameActive = true;
    this.announcerTarget.classList.add('hide');
    this.activePlayerIndex = 0
    this.endTurnButtonTarget.classList.remove("disabled");
    this.moveMade = false

    // Reset tiles
    this.tileTargets.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX', 'playerO');
    });

    this.renderPlayerDisplay();
  }

  // End turn
  endTurn() {
    if (!this.moveMade) {
      this.renderNotification("Invalid move. Please select a tile.");
      return;
    }

    this.moveMade = false;
    if (this.isGameActive) {
      this.switchPlayer();
    } else {
      this.endTurnButtonTarget.classList.add("disabled");
    }
  }

  // Render notification
  renderNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.getElementById('notification-container').appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}
