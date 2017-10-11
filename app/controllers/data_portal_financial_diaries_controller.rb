class DataPortalFinancialDiariesController < ApplicationController
  include FinscopeApi

  def index
    @country = FinscopeApi.get_countries.find{ |c| c[:iso] == params[:iso] }
  end
end
