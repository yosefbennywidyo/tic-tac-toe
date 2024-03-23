class GameController < ApplicationController
	# Display the index page
  def index
  end

  # Start the Tic Tac Toe game
  def start
    # Retrieve first and second player names from params
    @first_player ||= tik_tak_toe_params[:first_player]
    @second_player ||= tik_tak_toe_params[:second_player]
    
    # Initialize the game board
    @board = Array.new(9)

    # If both player names are present, render the game board
    if @first_player.present? && @second_player.present?
      render 'board'
    else
      # If player names are missing, display a warning message and redirect to the root path
      flash[:warning] = "Please input your players name"
      redirect_to root_path
    end
  end

  private

  # Permit first_player and second_player parameters
  def tik_tak_toe_params
    params.permit(:first_player, :second_player)
  end
end
