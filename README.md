# Tic Tac Toe

This is a simple web-based Tic Tac Toe game built with Ruby on Rails and StimulusJS.

## Requirements

- Ruby version: 3.3.0

## Getting Started

To run the game locally on your machine, follow these steps:

### Clone this repository to your local machine:

```bash
git clone git@github.com:yosefbennywidyo/tic-tac-toe.git
```

### Navigate to the project directory:

```bash
cd tic-tac-toe
```

### Install the necessary dependencies:

```bash
bundle install
```

### Start the Rails server:

```bash
rails server
```

Open your web browser and navigate to http://localhost:3000 to play the game.

## Gameplay

- Enter the names of Player 1 and Player 2.
- Click the "Start Game" button to begin.
- Players take turns clicking on empty tiles to place their symbol (X or O).
- The first player to form a horizontal, vertical, or diagonal line of three of their symbols wins.
- If all tiles are filled and no player has won, the game ends in a draw.


## Running Tests

To run the test suite, execute the following command:

```bash
rails test:all
```
