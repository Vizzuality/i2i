require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def test_index
    get data_portal_path
    
    assert_response :success
  end
end
