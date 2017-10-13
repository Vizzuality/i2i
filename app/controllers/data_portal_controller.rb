class DataPortalController < ApplicationController
  include FinscopeApi

  def index
    # @countries = FinscopeApi.get_countries
    @countries = Country.country_list
  end

  def country_preview
    @country = FinscopeApi.get_countries.find{ |c| c[:iso] == params[:iso] }
  end

  def show
  end
end
