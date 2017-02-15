class DataPortal::CountriesController < ApplicationController
  before_action :set_country, only: [:show, :edit, :update, :destroy]

  def show
  end

  private
  def set_country
    @country = Country.find(params[:id])
  end
end
