require 'test_helper'

class DatasetsControllerTest < ActionDispatch::IntegrationTest
  def test_index_for_authenticated_user
    user = users(:alexey)
    sign_in user
    
    get datasets_path
    
    assert_response :success
  end
  
  def test_index_redirects_to_sign_in_for_unauthenticated_user
    get datasets_path

    assert_redirected_to new_user_session_path
  end
end
