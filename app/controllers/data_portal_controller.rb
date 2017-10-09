class DataPortalController < ApplicationController
  include FinscopeApi

  def index
    @countries = FinscopeApi.get_countries
  end

  def countryPreview
    @country = FinscopeApi.get_countries.find{ |c| c[:iso] == params[:iso] }
  end

  def show
  end
end
