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
#

class HouseholdMemberTransactionHistory < ApplicationRecord
  belongs_to :household_member_transaction
end
