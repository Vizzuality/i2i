# == Schema Information
#
# Table name: household_transactions
#
#  id             :integer          not null, primary key
#  project_name   :string
#  household_name :string
#  category_type  :string
#  category_name  :string
#  subcategory    :string
#  num_accounts   :integer
#  num_members    :integer
#  num_adults     :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class HouseholdTransactionSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :household_name, :category_type, :category_name,
             :subcategory, :num_accounts, :num_members, :num_adults

  # has_many :values

  # def values
  #   object.household_transaction_histories
  # end

  attribute :values do
    object.household_transaction_histories.map do |history|
      if history.send(indicator).present?
        HouseholdTransactionHistorySerializer.new(history).serializable_hash.merge(
          value: history.send(indicator)
        )
      end
    end.compact
  end

  def indicator
    default_indicators[object.category_type.to_sym]
  end

  def default_indicators
    {
      credits: :rolling_balance,
      savings: :rolling_balance,
      income: :total_transaction_value,
      expense: :total_transaction_value
    }
  end
end
