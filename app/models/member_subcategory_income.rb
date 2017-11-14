# == Schema Information
#
# Table name: member_subcategory_incomes
#
#  id             :integer          not null, primary key
#  project_name   :string
#  household_name :string
#  person_code    :string
#  value          :float
#  subcategory    :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class MemberSubcategoryIncome < ApplicationRecord
  scope :project_name, -> (project_name) { where(project_name: project_name) }

  class << self
    def main_incomes(project_name)
      grouped_by_household_and_member(project_name).map do |household, values|
        value = values.max_by(&:value).subcategory

        {
          name: value,
          value: value
        }
      end.uniq.sort { |a, b| a[:name] <=> b[:name] }
    end

    def members_with_main(subcategory, project_name)
      grouped_by_household_and_member(project_name).map do |household_member, values|
        household_member if values.max_by(&:value).subcategory == subcategory
      end.compact
    end

    def grouped_by_household_and_member(project_name)
      project_name(project_name).group_by { |inc| [inc.household_name, inc.person_code] }
    end
  end
end
