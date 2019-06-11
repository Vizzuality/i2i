require 'test_helper'

class RegionsControllerTest < ActionDispatch::IntegrationTest
  def test_show_region
    get regions_path(regions(:europe))
    
    assert_response :success
  end
end
