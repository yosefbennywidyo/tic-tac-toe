import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["tile", "playerDisplay", "announcer", "resetButton", "endTurnButton"];
  
  initialize() {
    this.board = Array(9).fill('');
    this.players = ['X', 'O'];
    this.winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    this.activePlayerIndex = 0; // Index of the current active player
    this.isGameActive = true;
    this.moveMade = false
    this.generateTiles();
    this.renderPlayerDisplay();
  }
  
  generateTiles() {
    const container = this.targets.find('ticTacToeBoard');
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="tile" data-tic-tac-toe-target="tile" data-action="click->tic-tac-toe#handleTileClick"></div>
    `;

    for (let i = 0; i < 9; i++) {
      const tile = template.content.firstElementChild.cloneNode(true);
      tile.dataset.index = i;
      container.appendChild(tile);
    }
  }
  
  renderPlayerDisplay() {
    const firstPlayerName = this.element.dataset.firstPlayerName;
    const secondPlayerName = this.element.dataset.secondPlayerName;
    var currentPlayerName = ''

    if (this.players[this.activePlayerIndex] === 'X') {
        currentPlayerName = firstPlayerName;
    } else {
        currentPlayerName = secondPlayerName;
    }

    if (this.isGameActive) {
      const currentPlayer = this.players[this.activePlayerIndex];
      this.playerDisplayTarget.innerHTML = `It's <span class="display player${currentPlayer}">${currentPlayerName}</span>'s turn`;
    }
  }
  
  handleTileClick(event) {
    if (!this.isGameActive) {
      this.renderNotification("Game is over, please reset");
      return;
    }
    
    const tile = event.currentTarget;
    const index = parseInt(tile.dataset.index);

    if (!this.isTileEmpty(tile)) {
      this.renderNotification("This tile is already occupied!");
      return;
    }

    if (this.moveMade) {
      this.renderNotification("You can only select one tile before ending your turn.");
      return;
    }

    this.moveMade = true;
    this.updateBoard(index);
    this.handleResultValidation();
  }

  isTileEmpty(tile) {
    return tile.innerText === '';
  }

  updateBoard(index) {
    this.board[index] = this.players[this.activePlayerIndex];
    this.updateTileDisplay(index);
  }

  updateTileDisplay(index) {
    const tile = this.tileTargets.find((t) => parseInt(t.dataset.index) === index);
    tile.innerText = this.players[this.activePlayerIndex];
    tile.classList.add(`player${this.players[this.activePlayerIndex]}`);
  }

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

  switchPlayer() {
    this.activePlayerIndex = (this.activePlayerIndex + 1) % 2;
    this.renderPlayerDisplay();
  }

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

  announceTie() {
    this.announcerTarget.innerText = 'Tie';
    this.announcerTarget.classList.remove('hide');
    this.playerDisplayTarget.innerHTML = "Game Over";
    this.endTurnButtonTarget.classList.add("disabled");
  }

  isFirstPlayer(playerIndex) {
    return playerIndex % 2 === 0;
  }

  handleReset() {
    this.board = Array(9).fill('');
    this.isGameActive = true;
    this.announcerTarget.classList.add('hide');
    this.activePlayerIndex = 0
    this.endTurnButtonTarget.classList.remove("disabled");
    this.moveMade = false

    this.tileTargets.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX', 'playerO');
    });

    this.renderPlayerDisplay();
  }

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
