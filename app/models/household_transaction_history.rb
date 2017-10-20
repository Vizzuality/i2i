# == Schema Information
#
# Table name: household_transaction_histories
#
#  id                       :integer          not null, primary key
#  household_transaction_id :integer
#  value                    :string
#  month                    :integer
#  year                     :integer
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#

class HouseholdTransactionHistory < ApplicationRecord
  belongs_to :household_transaction

  scope :with_values, -> { where.not(rolling_balance: nil).or(where.not(total_transaction_value: nil)).order([:year, :month]) }
end
