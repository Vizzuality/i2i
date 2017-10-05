# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  slug       :string
#

class Tag < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  has_many :tagged_items, :dependent => :destroy
  has_many :libraries, :through => :tagged_items, :source => :taggable, :source_type => 'Library'
  validates :name, uniqueness: { case_sensitive: false }

  def should_generate_new_friendly_id?
    name_changed?
  end
end
