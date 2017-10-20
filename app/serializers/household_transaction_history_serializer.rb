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
    end
  end
end
