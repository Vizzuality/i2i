class DataPortalFinancialDiariesController < ApplicationController
  def index
    country_iso = params[:iso]
    project_name = ProjectMetadatum.find_by(country_iso3: country_iso).project_name
    @country = Country.find_by(iso: country_iso)
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities(country_iso)
    @selectedCategories = [];

    if params[:p].present?
      filters = JSON.parse(Base64.decode64(params[:p]))
      @selectedCategories = filters['categories'] || []
    end

    gon.project_name = project_name
    gon.categories = JSON.parse @categories.to_json
  end

  def country_preview
    @country = Country.find_by(iso: params[:iso])
    @country_finscope = @country.finscope
    @country_financial_diaries = @country.financial_diaries
  end
end
