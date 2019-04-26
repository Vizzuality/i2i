require 'test_helper'

class PartnerTest < ActiveSupport::TestCase
  def test_name_is_required
    partner = Partner.new
    
    refute partner.valid?
    assert_not_nil partner.errors[:name]
  end
end
