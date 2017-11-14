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
#  total_transaction_value  :float
#  avg_value                :float
#  min_value                :float
#  max_value                :float
#  rolling_balance          :float
#  business_expenses        :float
#  withdrawals              :float
#  deposits                 :float
#  new_borrowing            :float
#  repayment                :float
#  date                     :datetime
#

class HouseholdTransactionHistory < ApplicationRecord
  belongs_to :household_transaction

  scope :with_values, -> { where.not(rolling_balance: nil).or(where.not(total_transaction_value: nil)).order([:year, :month]) }
  scope :with_indicator, -> (indicator) { where.not(indicator => nil) }
end
