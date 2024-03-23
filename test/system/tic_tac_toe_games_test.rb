require "application_system_test_case"

class TicTacToeGamesTest < ApplicationSystemTestCase
  def setup
    visit root_path
  end

  test "play game to determine winner" do
    fill_in_players("Alice", "Bob")
    start_game

    make_move(0)
    make_move(1)
    make_move(3)
    make_move(4)
    end_turn_disabled(6)
    
    game_is_over
    assert_winner("Alice")
  end

  test "not able to click tile when winner announce" do
    fill_in_players("Alice", "Bob")
    start_game

    make_move(0)
    make_move(1)
    make_move(3)
    make_move(4)
    end_turn_disabled(6)

    game_is_over
  end

  test "play game to determine draw" do
    fill_in_players("Alice", "Bob")
    start_game

    make_move(0)
    make_move(1)
    make_move(3)
    make_move(4)
    make_move(2)
    make_move(5)
    make_move(7)
    make_move(6)
    end_turn_disabled(8)

    game_is_over
    assert_draw
  end

  test "play game to determine invalid move" do
    fill_in_players("Alice", "Bob")
    start_game

    make_move(0)
    make_move(1)
    make_move(1)

    assert_occupied
  end

  test "play game to determine user not click tile more than once" do
    fill_in_players("Alice", "Bob")
    start_game

    find("div[data-index='#{0}']").click
    find("div[data-index='#{1}']").click

    end_turn
    
    assert_multi_tiles
  end


  test "starting a game with valid player names" do
    fill_in_players("Alice", "Bob")
    start_game

    assert_text "Tic Tac Toe"
    assert_text "It's Alice's turn"
  end

  test "starting a game with only one player name (Player 1)" do
    fill_in_players("Alice", "")
    start_game

    assert_flash_message_and_redirect
  end

  test "starting a game with only one player name (Player 2)" do
    fill_in_players("", "Bob")
    start_game

    assert_flash_message_and_redirect
  end

  test "redirecting to root when player names are missing" do
    click_button "Start Game"

    assert_flash_message_and_redirect
  end

  private

  # Helper method to fill in player names
  def fill_in_players(player1, player2)
    fill_in "Player 1 Name:", with: player1
    fill_in "Player 2 Name:", with: player2
  end

  # Helper method to start the game
  def start_game
    click_button "Start Game"
  end

  # Helper method to end the turn
  def end_turn
    click_button "End turn"
  end

  # Helper method to assert flash message and redirection
  def assert_flash_message_and_redirect
    assert_text "Please input your players name"
    assert_current_path root_path
  end

  # Helper method to make a move
  def make_move(index)
    find("div[data-index='#{index}']").click

    end_turn
  end

  # Helper method to check if the end turn button is disabled
  def end_turn_disabled(index)
    find("div[data-index='#{index}']").click
    find("#end-turn").disabled?
  end

  # Helper method to assert the winner
  def assert_winner(player)
    assert_text "Congrats #{player}, you won"
  end

  # Helper method to assert a draw
  def assert_draw
    assert_text "Tie"
  end

  # Helper method to assert an occupied tile
  def assert_occupied
    assert_text "This tile is already occupied"
  end

  # Helper method to assert multiple tiles selected
  def assert_multi_tiles
    assert_text "You can only select one tile before ending your turn"
  end

  # Helper method to assert the game is over
  def game_is_over
    assert_text "Game Over"
  end
end
