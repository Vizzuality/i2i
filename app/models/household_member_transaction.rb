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

class HouseholdMemberTransaction < ApplicationRecord
  include Filterable

  has_one :project_metadatum, class_name: 'ProjectMetadatum', primary_key: :project_name, foreign_key: :project_name
  has_many :household_member_transaction_histories
  has_many :household_member_transaction_histories_with_values, -> { with_values },
                                                   foreign_key: "household_member_transaction_id",
                                                   class_name: "HouseholdMemberTransactionHistory"

  scope :project_name, -> (project_name) { where project_name: project_name }
  scope :gender, -> (gender) { where gender: gender }
  scope :household_name, -> (household_name) { where household_name: household_name }
  scope :category_name, -> (category_name) { where category_name: category_name }
  scope :category_type, -> (category_type) { where category_type: category_type }
  scope :subcategory, -> (subcategory) { where subcategory: subcategory }
  scope :with_subcategory, -> { where.not(subcategory: nil) }

  scope :filter_combined, -> (project_name, category_type, subcategory) do
    if subcategory
      where(project_name: project_name, category_type: category_type, subcategory: subcategory)
    else
      where(project_name: project_name, category_type: category_type)
    end
  end

  def values
    project = project_metadatum
    start_date = project.start_date
    end_date = project.end_date

    household_member_transaction_histories_with_values.where(date: start_date..end_date).map do |history|
      if history.send(indicator).present?
        HouseholdMemberTransactionHistorySerializer.new(history).serializable_hash.merge(
          value: history.send(indicator)
        )
      end
    end.compact
  end

  def indicator
    default_indicators[category_type.to_sym]
  end

  def default_indicators
    {
      credits: :rolling_balance,
      savings: :rolling_balance,
      income: :total_transaction_value,
      expense: :total_transaction_value
    }
  end

  def self.category_tree(project_name)
    categories = []
    types = where(project_name: project_name).pluck(:category_type).uniq

    types.each do |type|
      children = HouseholdMemberTransaction.where(project_name: project_name, category_type: type)
                  .pluck(:subcategory).uniq.compact.map { |c| { name: c } }
      categories << { name: type, children: children }
    end

    categories
  end
end
