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
#

class Category < ApplicationRecord
  has_many :subcategories
  validates_presence_of :name
  validates_uniqueness_of :name
  before_validation :generate_slug

  private
    def generate_slug
      write_attribute(:slug, self.name.parameterize)
    end
end
