class DataPortal::CountriesController < ApplicationController
  before_action :set_country, only: [:show, :edit, :update, :destroy]

  def show
    render :layout => 'data_portal'
  end

  private
  def set_country
    @country = Country.find(params[:id])
  end

end
