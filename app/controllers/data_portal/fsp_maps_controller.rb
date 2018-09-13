class DataPortal::FspMapsController < ApplicationController
  def show
    @iso = params[:iso]
    @country = Country.find_by(iso: @iso)
    @countries = Country.where(has_fsp_maps: true)
    @latest_year = @country.finscope[:latest_year] rescue nil
    render layout: 'data_portal'
  end
end
