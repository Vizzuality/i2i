# == Schema Information
#
# Table name: household_income_tiers
#
#  id           :integer          not null, primary key
#  min          :float
#  max          :float
#  count        :integer
#  ntile        :integer
#  project_name :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class HouseholdIncomeTier < ApplicationRecord
  include HumanReadable

  class << self
    def ranges(project_name)
      where(project_name: project_name).map do |tier|
        {
          value: tier.ntile,
          name: "#{human_readable(tier.min)} - #{human_readable(tier.max)}"
        }
      end
    end
  end
end
