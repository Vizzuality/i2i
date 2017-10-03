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
  has_many :household_transaction_histories
end
