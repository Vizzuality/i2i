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

  has_many :values

  def values
    object.household_member_transaction_histories_with_avg
  end
end
