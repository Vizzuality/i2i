require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def test_edit_for_authenticated_user
    user = users(:alexey)
    sign_in user
    
    get account_path
    
    assert_response :success
  end
  
  def test_edit_redirects_to_sign_in_for_unauthenticated_user
    get account_path
  
    assert_redirected_to new_user_session_path
  end
  
  def test_update_updates_user_name
    user = users(:alexey)
    sign_in user
    
    patch user_path(user), params: { user: { name: "John" } }
    
    assert_equal "John", user.name
  end
  
  def test_update_redirects_to_account
    user = users(:alexey)
    sign_in user
  
    put user_path(user), params: { user: { name: "John" } }

    assert_redirected_to account_path
  end
end
