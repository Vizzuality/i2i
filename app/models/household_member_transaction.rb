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
  has_many :household_member_transaction_histories
end
