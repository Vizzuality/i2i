class DataPortalFinancialDiariesController < ApplicationController
  include FinscopeApi

  def index
    @country = FinscopeApi.get_countries.find{ |c| c[:iso] == params[:iso] }
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities

    gon.categories = JSON.parse @categories.to_json
  end
end
