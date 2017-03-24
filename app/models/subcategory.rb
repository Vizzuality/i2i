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
#

class Subcategory < ApplicationRecord
  belongs_to :category
  has_many :libraries, dependent: :nullify
  validates_presence_of :name
  validates_uniqueness_of :name, scope: :category_id
end
