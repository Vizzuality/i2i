# == Schema Information
#
# Table name: tagged_items
#
#  id            :integer          not null, primary key
#  taggable_type :string
#  taggable_id   :integer
#  tag_id        :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class TaggedItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
