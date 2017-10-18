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

class HouseholdTransactionHistorySerializer < ActiveModel::Serializer
  attributes :id, :avg_value, :month, :year, :date

  def date
    Date.new(object.year, object.month, 1)
  end

  def avg_value
    if object.value.present?
      object.value.split(':')[1].to_f

      # values = object.value.split(':').map { |val| val.eql?("null") ? nil : val.to_f }

      # {
      #   total_transaction_value: values[0],
      #   avg_value: values[1],
      #   min_value: values[2],
      #   max_value: values[3],
      #   rolling_balance: values[4],
      #   business_expenses: values[5],
      #   withdrawals: values[6],
      #   deposits: values[7],
      #   new_borrowing: values[8],
      #   repayment: values[9]
      # }
    end
  end
end
