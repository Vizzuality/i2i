require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def test_name_or_email_for_user_without_name
    assert_equal 'nameless@example.com', users(:nameless).name_or_email
  end
  
  def test_name_or_email_returns_name_if_it_exists
    assert_equal 'Alexey', users(:alexey).name_or_email
  end
end
