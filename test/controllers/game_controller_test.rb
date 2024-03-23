require "test_helper"

class GameControllerTest < ActionDispatch::IntegrationTest
  def setup
    # Define valid parameters for the Tic Tac Toe game
    @valid_params = { first_player: "Player 1", second_player: "Player 2" }
  end

  test "should start Tic Tac Toe game" do
    post_start_with_params(@valid_params)
    assert_response :success
  end

  test "should redirect without players name" do
    post_start_with_params({})
    assert_redirected_to root_path
    assert_flash_warning
  end

  test "should redirect when only player one name is provided" do
    post_start_with_params(first_player: "Player 1")
    assert_redirected_to root_path
    assert_flash_warning
  end

  test "should redirect when only player two name is provided" do
    post_start_with_params(second_player: "Player 2")
    assert_redirected_to root_path
    assert_flash_warning
  end

  private

  # Method to simulate posting to the start action with given parameters
  def post_start_with_params(params)
    post game_start_path, params: params
  end

  # Method to assert the presence of flash warning message
  def assert_flash_warning
    assert_equal "Please input your players name", flash[:warning]
  end
end
