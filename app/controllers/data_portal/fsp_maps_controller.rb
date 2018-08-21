class DataPortal::FspMapsController < ApplicationController
  def show
    @iso = params[:iso]
    @country = Country.find_by(iso: @iso)
    @countries = Country.all_except(@country)
    render layout: 'data_portal'
  end
end
