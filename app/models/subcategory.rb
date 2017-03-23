class Subcategory < ApplicationRecord
  belongs_to :category
  validates_presence_of :name
end
