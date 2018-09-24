# == Schema Information
#
# Table name: countries
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  iso        :string
#  bbox       :string           default([]), is an Array
#

class Country < ApplicationRecord
  include FinscopeApi

  scope :all_except, ->(country) { where.not(id: country) }

  attr_accessor :has_finscope
  attr_accessor :has_financial_diaries

  def has_dataset
    financial_diaries.present? || finscope.present? || geospatial.present?
  end

  def finscope
    FinscopeApi.get_countries.find { |c| c[:iso] == iso }
  end

  def financial_diaries
    ProjectMetadatum.find_by(country_iso3: iso)
  end

  def geospatial
    has_fsp_maps
  end

  class << self
    def finscope_country_list
      FinscopeApi.get_countries
    end
  end
end
