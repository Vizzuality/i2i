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

class CategoryUsageSerializer < ActiveModel::Serializer
  attributes :id, :category_type, :category_name, :subcategory, :project_name, :num_rows, :num_projects
end
