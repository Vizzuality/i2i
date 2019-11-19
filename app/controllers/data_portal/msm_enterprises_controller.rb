class DataPortal::MsmEnterprisesController < ApplicationController

  def index
    msme_countries_response = GetMsmeCountriesFromApi.new.perform
    msme_countries = JSON.parse msme_countries_response.body

    # MSME countries
    @worldwide_countries = msme_countries.each_with_object([]) do |country, acc|
      years_size = country['year'].size
      latest_year = country['year'][years_size - 1]['year']
      acc.push OpenStruct.new(
        name: country["name"],
        iso: country["iso"],
        link: msm_enterprises_show_path(country["iso"], latest_year),
        has_dataset: true,
        icon: :msme
      )
    end
  end

  def show
    @countries = Country.all.map(&:finscope).compact
    @country = Country.find_by(iso: params[:iso])
    @country_latest_year = @countries.find do |c|
      c[:iso] == @country.iso
    end[:latest_year].to_s
    render :layout => 'data_portal'
  end
end
