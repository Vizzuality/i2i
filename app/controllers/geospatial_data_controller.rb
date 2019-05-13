class GeospatialDataController < ApplicationController
  def index
    @countries_db = Country.ordered_by_name.where(has_fsp_maps: true)
    @regions = Region.joins(:country_regions).where(country_regions: { country_id: @countries_db.pluck(:id) }).uniq

    @countries = @countries_db.each_with_object([]) do |country, acc|
      acc.push OpenStruct.new(
        name: country.name,
        iso: country.iso,
        has_dataset: true,
        icon: :geospatial_data
      )
    end
  end
end
