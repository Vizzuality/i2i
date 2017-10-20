# == Schema Information
#
# Table name: household_member_transactions
#
#  id                   :integer          not null, primary key
#  project_name         :string
#  household_name       :string
#  person_code          :string
#  gender               :string
#  relationship_to_head :string
#  employed             :string
#  status               :string
#  category_type        :string
#  category_name        :string
#  subcategory          :string
#  age                  :integer
#  num_accounts         :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class HouseholdMemberTransactionSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :household_name, :person_code, :gender, :age, :relationship_to_head,
             :employed, :status, :category_type, :category_name, :subcategory, :num_accounts

  # has_many :values

  # def values
  #   object.household_member_transaction_histories
  # end

  attribute :values do
    object.household_member_transaction_histories.map do |history|
      if history.send(indicator).present?
        HouseholdMemberTransactionHistorySerializer.new(history).serializable_hash.merge(
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
