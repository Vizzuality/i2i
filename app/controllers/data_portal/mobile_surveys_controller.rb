class DataPortal::MobileSurveysController < ApplicationController

  def index
    mobile_surveys_countries_response = GetMobileSurveysCountriesFromApi.new.perform
    mobile_surveys_countries = mobile_surveys_countries_response ? JSON.parse(mobile_surveys_countries_response.body) : []

    # MSME countries
    @worldwide_countries = mobile_surveys_countries.each_with_object([]) do |country, acc|
      years_size = country['year'].size
      latest_year = country['year'][years_size -1]['year']
      country_db = Country.find_by(iso: country['iso'])
      acc.push OpenStruct.new(
        name: country_db.name,
        iso: country["iso"],
        link: mobile_surveys_show_path(country["iso"], latest_year),
        has_dataset: true,
        icon: :msme
      )
    end
  end

  def show
    mobile_surveys_countries_response = GetMobileSurveysCountriesFromApi.new.perform
    mobile_surveys_countries = mobile_surveys_countries_response ? JSON.parse(mobile_surveys_countries_response.body) : []
    mobile_surveys_countries_iso = mobile_surveys_countries.collect { |m| m['iso'] }

    @countries = Country.where(iso: mobile_surveys_countries_iso)
    @country = Country.find_by(iso: params[:iso])
    @country_latest_year = mobile_surveys_countries.find do |c|
      c['iso'] == @country.iso
    end['year'][0]['year'].to_s

    @countries_for_select = @countries.map do |c|
      {
        name: c.name,
        iso: c.iso,
        latest_year: mobile_surveys_countries.find do |mobile_surveys_c|
          mobile_surveys_c['iso'] == c[:iso]
        end['year'][0]['year'].to_s
      }
    end

    gon.countries = Country.all.ordered_by_name

    render :layout => 'data_portal_mobile_surveys'
  end
end
