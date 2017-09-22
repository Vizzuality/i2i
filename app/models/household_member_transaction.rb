class HouseholdMemberTransaction < ApplicationRecord
  has_many :household_member_transaction_histories
end
