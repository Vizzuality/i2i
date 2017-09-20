class HouseholdTransaction < ApplicationRecord
  has_many :household_transaction_histories
end
