class NationalSurveysController < ApplicationController
  def index
    @finscope_countries = Country.finscope_country_list.map { |country_hash| country_hash[:iso] }
    @countries_db = Country.ordered_by_name.select { |c| @finscope_countries.include?(c.iso) }

    @countries = @countries_db.each_with_object([]) do |country, acc|
      acc.push OpenStruct.new(
        name: country.name,
        iso: country.iso,
        has_dataset: true,
        icon: :national_surveys
      )
    end

    @regions = Region.joins(:country_regions).where(country_regions: { country_id: @countries_db.pluck(:id) }).uniq
  end
end
