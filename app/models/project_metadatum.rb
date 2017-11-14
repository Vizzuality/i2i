# == Schema Information
#
# Table name: project_metadata
#
#  id                      :integer          not null, primary key
#  project_name            :string
#  name                    :string
#  country_iso2            :string
#  country_iso3            :string
#  currency_singular       :string
#  currency_plural         :string
#  currency_code           :string
#  currency_symbol         :string
#  num_households_in_hh    :integer
#  num_households_in_mem   :integer
#  member_level_interviews :integer
#  start_date              :datetime
#  end_date                :datetime
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  num_members_in_mem      :integer
#  province                :string
#

class ProjectMetadatum < ApplicationRecord
  include Filterable

  scope :project_name, -> (project_name) { where project_name: project_name }

  def self.quantities(country_iso)
    project = find_by(country_iso3: country_iso)

    {
      project_name: project.project_name,
      number_households: project.num_households_in_hh,
      number_individuals: project.num_members_in_mem
    }
  end
end
