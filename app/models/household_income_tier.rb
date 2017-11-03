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
