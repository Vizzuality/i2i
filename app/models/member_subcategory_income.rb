class MemberSubcategoryIncome < ApplicationRecord
  scope :project_name, -> (project_name) { where(project_name: project_name) }

  class << self
    def main_incomes(project_name)
      grouped_by_household_and_member(project_name).map do |household, values|
        { name: values.max_by(&:value).subcategory }
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