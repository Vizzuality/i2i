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

class HouseholdMemberTransactionHistorySerializer < ActiveModel::Serializer
  attributes :id, :parsed_value, :month, :year

  def parsed_value
    if object.value.present?
      values = object.value.split(':').map { |val| val.eql?("null") ? nil : val.to_f }

      {
        avg_value: values[0],
        min_value: values[1],
        max_value: values[2],
        rolling_balance: values[3],
        business_expenses: values[4],
        withdrawals: values[5],
        deposits: values[6],
        new_borrowing: values[7],
        repayment: values[8]
      }
    end
  end
end
