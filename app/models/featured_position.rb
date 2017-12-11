# == Schema Information
#
# Table name: featured_positions
#
#  id                :integer          not null, primary key
#  position          :integer
#  positionable_type :string
#  positionable_id   :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class FeaturedPosition < ApplicationRecord
  acts_as_list

  belongs_to :positionable, polymorphic: true
  validates_uniqueness_of :position
end
