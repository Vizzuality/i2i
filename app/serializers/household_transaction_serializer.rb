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

class HouseholdTransactionSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :household_name, :category_type, :category_name,
             :subcategory, :num_accounts, :num_members, :num_adults

  has_many :household_transaction_histories

  # has_many :values

  # def values
  #   object.household_transaction_histories_with_avg.sort { |a, b| [a[:year], a[:month]] <=> [b[:year], b[:month]] }
  # end
end
