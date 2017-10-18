class DataPortalController < ApplicationController
  def index
    @countries = Country.country_list
  end

  def country_preview
    @country = Country.find_by(iso: params[:iso])
  end

  def show
  end
end
