# == Schema Information
#
# Table name: countries
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  iso        :string
#

class Country < ApplicationRecord
  include FinscopeApi

  attr_accessor :has_finscope
  attr_accessor :has_financial_diaries

  def has_dataset
    financial_diaries.present? || finscope.present?
  end

  def finscope
    FinscopeApi.get_countries.find { |c| c[:iso] == iso }
  end

  def financial_diaries
    ProjectMetadatum.find_by(country_iso3: iso)
  end
end
