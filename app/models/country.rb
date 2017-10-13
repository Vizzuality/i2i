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

  class << self
    def country_list
      countries = all
      countries.each do |country|
        iso = country.iso
        country.has_finscope = finscope_country(iso)
        country.has_financial_diaries = financial_diaries_country(iso)
      end

      countries
    end

    def finscope_country(iso)
      FinscopeApi.get_countries.select { |fc| fc[:iso] == iso }.first
    end

    def financial_diaries_country(iso)
      country = ProjectMetadatum.find_by(country_iso3: iso)
      country.attributes if country
    end
  end
end
