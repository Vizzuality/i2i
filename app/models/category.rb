class Category < ApplicationRecord
  has_many :subcategories
  validates_presence_of :name
end
