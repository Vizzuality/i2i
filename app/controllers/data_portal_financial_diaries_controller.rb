class DataPortalFinancialDiariesController < ApplicationController
  def index
    @country = Country.find_by(iso: params[:iso])
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities
  end
end
