class DataPortalFinancialDiariesController < ApplicationController
  def index
    country_iso = params[:iso]
    project_name = ProjectMetadatum.find_by(country_iso3: country_iso).project_name
    @country = Country.find_by(iso: country_iso)
    @categories = HouseholdTransaction.category_tree(project_name)
    @project_quantities = ProjectMetadatum.quantities(country_iso)
    @selectedCategories = [{
      type: @categories.find { |cat| cat[:name] == "income" }[:name],
      subcategory: nil,
      visible: true
    }.stringify_keys]
    @selectedDemographicFilters = []

    @demographicFilters = [
      {
        label: "Gender",
        value: "gender",
        children: [
          {
            label: "Male",
            value: "male"
          },
          {
            label: "Female",
            value: "female"
          }
        ]
      },
      {
        label: "Age",
        value: "age",
        children: [
          {
            label: "20-30",
            value: "20-30"
          },
          {
            label: "30-40",
            value: "30-40"
          }
        ]
      }
    ]

    if params[:p].present?
      filters = JSON.parse(Base64.decode64(params[:p]))
      @selectedCategories = filters['categories'] || []
      @selectedDemographicFilters = filters['demography'] || []
      @household = filters['household'] || nil
    end


    gon.project_name = project_name
    gon.categories = JSON.parse @categories.to_json
    gon.selectedCategories = JSON.parse @selectedCategories.to_json
  end

  def country_preview
    @country = Country.find_by(iso: params[:iso])
    @country_finscope = @country.finscope
    @country_financial_diaries = @country.financial_diaries
  end
end
