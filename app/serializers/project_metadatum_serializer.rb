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

class ProjectMetadatumSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :start_date, :end_date, :name, :country_iso2, :country_iso3,
             :currency_singular, :currency_plural, :currency_code, :currency_symbol, :num_households_in_hh,
             :num_households_in_mem, :member_level_interviews
end
