# == Schema Information
#
# Table name: household_transactions
#
#  id             :integer          not null, primary key
#  project_name   :string
#  household_name :string
#  category_type  :string
#  category_name  :string
#  subcategory    :string
#  num_accounts   :integer
#  num_members    :integer
#  num_adults     :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class HouseholdTransaction < ApplicationRecord
  include Filterable

  has_many :household_transaction_histories_all, class_name: 'HouseholdTransactionHistory'
  has_many :household_transaction_histories, -> { with_values }

  scope :project_name, -> (project_name) { where project_name: project_name }
  scope :household_name, -> (household_name) { where household_name: household_name }
  scope :category_name, -> (category_name) { where category_name: category_name }
  scope :category_type, -> (category_type) { where category_type: category_type }
  scope :subcategory, -> (subcategory) { where subcategory: subcategory }


  scope :filter_combined, -> (project_name, category_type, subcategory) do
    if subcategory
      where(project_name: project_name, category_type: category_type, subcategory: subcategory)
    else
      where(project_name: project_name, category_type: category_type)
    end
  end

  def self.category_tree(project_name)
    categories = []
    types = where(project_name: project_name).pluck(:category_type).uniq

    types.each do |type|
      children = HouseholdTransaction.where(project_name: project_name, category_type: type)
                  .pluck(:subcategory).uniq.compact.map { |c| { name: c } }
      categories << { name: type, children: children }
    end
  end
end
