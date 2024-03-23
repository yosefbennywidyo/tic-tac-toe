class GameController < ApplicationController
	def index
  end

  def start
  	@first_player		||= tik_tak_toe_params[:first_player]
    @second_player	||= tik_tak_toe_params[:second_player]
    
    @board = Array.new(9)

    if @first_player.present? && @second_player.present?
      render 'board'
    else
      flash[:warning] = "Please input your players name"
      redirect_to root_path
    end
  end

  private

  def tik_tak_toe_params
  	params.permit(:first_player, :second_player)
  end

end
