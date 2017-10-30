# == Schema Information
#
# Table name: household_member_transactions
#
#  id                   :integer          not null, primary key
#  project_name         :string
#  household_name       :string
#  person_code          :string
#  gender               :string
#  relationship_to_head :string
#  employed             :string
#  status               :string
#  category_type        :string
#  category_name        :string
#  subcategory          :string
#  age                  :integer
#  num_accounts         :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class HouseholdMemberTransaction < ApplicationRecord
  include Filterable

  has_many :household_member_transaction_histories_all, class_name: 'HouseholdMemberTransactionHistory'
  has_many :household_member_transaction_histories, -> { with_values }

  scope :project_name, -> (project_name) { where project_name: project_name }
  scope :household_name, -> (household_name) { where household_name: household_name }
  scope :category_name, -> (category_name) { where category_name: category_name }
  scope :category_type, -> (category_type) { where category_type: category_type }
  scope :subcategory, -> (subcategory) { where subcategory: subcategory }
  scope :with_subcategory, -> { where.not(subcategory: nil) }

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
      children = HouseholdMemberTransaction.where(project_name: project_name, category_type: type)
                  .pluck(:subcategory).uniq.compact.map { |c| { name: c } }
      categories << { name: type, children: children }
    end

    categories
  end
end
