class DataPortalFinancialDiariesController < ApplicationController
  include FinscopeApi

  def index
    country_iso = params[:iso]
    @country = FinscopeApi.get_countries.find{ |c| c[:iso] == country_iso }
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities(country_iso)

    gon.categories = JSON.parse @categories.to_json
  end
end
