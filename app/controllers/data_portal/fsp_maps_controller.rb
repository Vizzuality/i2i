class DataPortal::FspMapsController < ApplicationController
  def show
    @country = Country.find_by(iso: params[:iso])
    @countries = Country.all_except(@country)
    render layout: 'data_portal'
  end
end
