class DataPortalFinancialDiariesController < ApplicationController
  def index
    @country = Country.find_by(iso: params[:iso])
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities(country_iso)
    @transactions = []

    if params[:p].present?
      filters = JSON.parse(Base64.decode64(params[:p]))
      klass = filters['type'] == 'households' ? HouseholdTransaction : HouseholdMemberTransaction

      filters['categories'].each do |category|
        @transactions << klass.filter_combined(project_name, category['type'], category['subcategory'])
      end
    end

    @transactions.flatten!

    gon.categories = JSON.parse @categories.to_json
  end
end
