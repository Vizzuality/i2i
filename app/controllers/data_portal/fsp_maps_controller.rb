class DataPortal::FspMapsController < ApplicationController
  def show
    user_countries = GetCountriesFromCarto.new.perform
    user_countries_iso = user_countries ? JSON.parse(user_countries.body)['rows'].collect { |c| c['iso'] } : []
    @countries = Country.ordered_by_name.where('iso IN (?) OR has_fsp_maps=?', user_countries_iso, true)

    gon.users_data = User.select('id, name, surname')
    @iso = params[:iso]
    @country = Country.find_by(iso: @iso)
    @latest_year = @country.finscope[:latest_year] rescue nil
    render layout: 'data_portal'
  end
end
