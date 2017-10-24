# == Schema Information
#
# Table name: category_usages
#
#  id            :integer          not null, primary key
#  category_type :string
#  category_name :string
#  subcategory   :string
#  project_name  :string
#  num_rows      :integer
#  num_projects  :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class CategoryUsage < ApplicationRecord
  include Filterable

  scope :category_type, -> (category_type) { where category_type: category_type }
  scope :category_name, -> (category_name) { where category_name: category_name }
  scope :subcategory, -> (subcategory) { where subcategory: subcategory }
end
