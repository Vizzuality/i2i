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

class HouseholdTransaction < ApplicationRecord
  include Filterable
  include Categorizable

  has_one :project_metadatum, class_name: 'ProjectMetadatum', primary_key: :project_name, foreign_key: :project_name
  has_many :household_transaction_histories
  has_many :household_transaction_histories_with_values, -> { with_values },
                                                        foreign_key: "household_transaction_id",
                                                        class_name: "HouseholdTransactionHistory"

  scope :project_name, -> (project_name) { where project_name: project_name }
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

    household_transaction_histories_with_values.where(date: start_date..end_date).map do |history|
      if history.send(indicator).present?
        HouseholdTransactionHistorySerializer.new(history).serializable_hash.merge(
          value: history.send(indicator)
        )
      end
    end.compact
  end

  class << self
    def households_within_tier(project_name, income_tier)
      income_range = HouseholdIncomeTier.find_by(project_name: project_name, ntile: income_tier)

      transactions = HouseholdTransaction.where(project_name: project_name,
                                                category_type: 'income',
                                                category_name: 'ALL')
                                          .where(total_income: income_range.min..income_range.max)

      transactions.pluck(:household_name).uniq
    end
  end
end
