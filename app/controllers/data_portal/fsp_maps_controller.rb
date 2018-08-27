class DataPortal::FspMapsController < ApplicationController
  def show
    @iso = params[:iso]
    @country = Country.find_by(iso: @iso)
    @countries = Country.where(has_fsp_maps: true)
    render layout: 'data_portal'
  end
end
