# == Schema Information
#
# Table name: household_member_transaction_histories
#
#  id                              :integer          not null, primary key
#  household_member_transaction_id :integer
#  value                           :string
#  month                           :integer
#  year                            :integer
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  total_transaction_value         :float
#  avg_value                       :float
#  min_value                       :float
#  max_value                       :float
#  rolling_balance                 :float
#  business_expenses               :float
#  withdrawals                     :float
#  deposits                        :float
#  new_borrowing                   :float
#  repayment                       :float
#

class HouseholdMemberTransactionHistory < ApplicationRecord
  belongs_to :household_member_transaction

  scope :with_avg, -> { where.not(avg_value: nil).order([:year, :month]) }
end
