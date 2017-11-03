# == Schema Information
#
# Table name: subcategories
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :integer
#  slug        :string
#

class Subcategory < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  belongs_to :category
  has_many :libraries, dependent: :nullify
  validates_presence_of :name
  validates_uniqueness_of :name, scope: :category_id

  def should_generate_new_friendly_id?
    name_changed?
  end
end
