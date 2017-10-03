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
#

class ProjectMetadatum < ApplicationRecord
end
