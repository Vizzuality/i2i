require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def test_ordered_by_name
    Country.create!(name: 'Botswana', iso: 'BWA', short_iso: 'BWA')
    
    assert_equal ['Bangladesh', 'Botswana', 'Ghana', 'Uganda', 'Zambia'],
                 Country.ordered_by_name.pluck(:name)
  end
end
