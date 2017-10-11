class DataPortalFinancialDiariesController < ApplicationController
  def index
    @country = Country.find_by(iso: params[:iso])
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities(country_iso)
    @transactions = []

    if params[:p].present?
      filters = JSON.parse(Base64.decode64(params[:p]))

      if filters['type'] == 'households'
        filters['categories'].each do |category|
          if category['subcategory']
            @transactions << HouseholdTransaction.where(project_name: project_name, category_type: category['type'], subcategory: category['subcategory'])
          else
            @transactions << HouseholdTransaction.where(project_name: project_name, category_type: category['type'])
          end
        end
      else
        filters['categories'].each do |category|
          if category['subcategory']
            @transactions << HouseholdMemberTransaction.where(project_name: project_name, category_type: category['type'], subcategory: category['subcategory'])
          else
            @transactions << HouseholdMemberTransaction.where(project_name: project_name, category_type: category['type'])
          end
        end
      end
    end

    @transactions.flatten!

    gon.categories = JSON.parse @categories.to_json
  end
end
