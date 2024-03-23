document.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    // Define winning conditions using an array of arrays
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Function to handle result validation
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i].map(index => board[index]);
            if (a && a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
        } else if (!board.includes('')) {
            announce(TIE);
        }
    }

    // Function to announce game result
    const announce = (type) => {
        if (announcer) {
            switch (type) {
                case PLAYERO_WON:
                    announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
                    break;
                case PLAYERX_WON:
                    announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
                    break;
                case TIE:
                    announcer.innerText = 'Tie';
            }
            announcer.classList.remove('hide');
        }
    };

    // Function to check if an action is valid
    const isValidAction = (tile) => !tile.innerText.trim();

    // Function to update the board
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    // Function to change the current player
    const changePlayer = () => {
        if (playerDisplay) {
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerDisplay.innerText = currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`);
        }
    };

    // Function to handle user action
		const userAction = (tile, index) => {
			if (isValidAction(tile) && isGameActive) {
		    tile.innerText = currentPlayer;
		    tile.classList.add(`player${currentPlayer}`);
		    updateBoard(index);
		    handleResultValidation();
		    changePlayer();
		  } else {
		    renderNotification("This tile is already occupied!");
		  }
		};

		// Function to render notification
		const renderNotification = (message) => {
		  const notification = document.createElement('div');
		  notification.classList.add('notification');
		  notification.textContent = message;
		  document.getElementById('notification-container').appendChild(notification);

		  // Remove notification after a delay
		  setTimeout(() => {
		  	notification.remove();
		  }, 10000); // Adjust the delay as needed
		};

    // Function to reset the board
    const resetBoard = () => {
        board = Array(9).fill('');
        isGameActive = true;
        if (announcer) announcer.classList.add('hide');
        if (currentPlayer === 'O') changePlayer();
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX', 'playerO');
        });
    };

    // Event listeners
    tiles.forEach((tile, index) => tile.addEventListener('click', () => userAction(tile, index)));
    if (resetButton) resetButton.addEventListener('click', resetBoard);
});