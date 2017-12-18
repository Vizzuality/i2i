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
#  total_income   :float
#

class HouseholdTransactionSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :household_name, :category_type, :category_name,
             :subcategory, :num_accounts, :num_members, :num_adults, :values

  def values
    object.values(instance_options[:selected_values])
  end
end
