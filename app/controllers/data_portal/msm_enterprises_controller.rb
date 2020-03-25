class DataPortal::MsmEnterprisesController < ApplicationController

  def index
    msme_countries_response = GetMsmeCountriesFromApi.new.perform
    msme_countries = msme_countries_response ? JSON.parse(msme_countries_response.body) : []

    # MSME countries
    @worldwide_countries = msme_countries.each_with_object([]) do |country, acc|
      next unless country['year'].any?
      years_size = country['year'].size
      latest_year = country['year'][years_size -1]['year']
      country_db = Country.find_by(iso: country['iso'])
      acc.push OpenStruct.new(
        name: country_db.name,
        iso: country["iso"],
        link: msm_enterprises_show_path(country["iso"], latest_year),
        has_dataset: true,
        icon: :msme
      )
    end.compact
  end

  def show
    msme_countries_response = GetMsmeCountriesFromApi.new.perform
    msme_countries = msme_countries_response ? JSON.parse(msme_countries_response.body) : []
    msme_countries_iso = msme_countries.collect { |m| m['iso'] }

    @countries = Country.where(iso: msme_countries_iso)
    @country = Country.find_by(iso: params[:iso])
    @country_latest_year = msme_countries.find do |c|
      c['iso'] == @country.iso
    end['year'][0]['year'].to_s

    @countries_for_select = @countries.map do |c|
      country = {
        name: c.name,
        iso: c.iso,
        latest_year: msme_countries.find do |msme_c|
          msme_c['iso'] == c[:iso]
        end.dig('year', 0, 'year')&.to_s
      }

      next unless country.dig('latest_year')

      country
    end.compact

    gon.countries = Country.all.ordered_by_name

    render :layout => 'data_portal'
  end
end
