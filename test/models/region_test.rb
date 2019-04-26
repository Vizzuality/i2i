require 'test_helper'

class RegionTest < ActiveSupport::TestCase
  def test_name_is_required
    region = Region.new(iso: 'EU')
  
    refute region.valid?
    assert_not_nil region.errors[:name]
  end
  
  def test_iso_is_required
    region = Region.new(name: 'Europe')
    
    refute region.valid?
    assert_not_nil region.errors[:iso]
  end
  
  def test_valid_region
    region = Region.new(name: 'Europe', iso: 'EU')
    
    assert region.valid?
  end
  
  def test_slug_is_regenerated_after_changing_iso
    region = regions(:europe)
    
    region.update!(iso: 'EUR')
    
    assert_equal 'eur', region.slug
  end
  
  def test_slug_includes_name_when_iso_is_not_unique
    region = regions(:europe)
    region.update!(iso: 'afr')

    assert_equal 'afr-europe', region.slug
  end
end
