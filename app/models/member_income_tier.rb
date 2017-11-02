class MemberIncomeTier < ApplicationRecord
  class << self
    def ranges(project_name)
      where(project_name: project_name).map do |tier|
        {
          value: tier.ntile,
          name: "#{tier.min} - #{tier.max}"
        }
      end
    end
  end
end
