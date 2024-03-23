module GameHelper
	def current_player_symbol
    @current_player == @first_player ? 'X' : 'O'
  end

  def get_column_index(text_field_id)
  	puts "get_column_index"
  	puts "text_field_id #{text_field_id}"
  	case text_field_id
  	when 'board[0][0]'
  		1
  	when 'board[0][1]'
  		2
  	when 'board[0][2]'
  		3
  	when 'board[1][0]'
  		4
  	when 'board[1][1]'
  		5
  	when 'board[1][2]'
  		6
  	when 'board[2][0]'
  		7
  	when 'board[2][1]'
  		8
  	when 'board[2][2]'
  		9
  	end
  end
end
