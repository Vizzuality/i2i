# == Schema Information
#
# Table name: categories
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  slug        :string
#  position    :integer
#

class Category < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]
  
  validates_presence_of :name
  validates_uniqueness_of :name

  def should_generate_new_friendly_id?
    name_changed?
  end
end
