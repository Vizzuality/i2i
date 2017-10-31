class DataPortalFinancialDiariesController < ApplicationController
  def index
    country_iso = params[:iso]
    project_name = ProjectMetadatum.find_by(country_iso3: country_iso).project_name
    @country = Country.find_by(iso: params[:iso])
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities(country_iso)
    @selectedCategories = [{
      type: @categories.find { |cat| cat[:name] == "income" }[:name],
      subcategory: nil,
      visible: true
    }.stringify_keys]
    @selectedSubFilters = []
    @main_incomes = {
      households: HouseholdSubcategoryIncome.main_incomes(project_name),
      members: MemberSubcategoryIncome.main_incomes(project_name)
    }
    @filters = [];

    if params[:p].present?
      filters = JSON.parse(Base64.decode64(params[:p]))
      @selectedCategories = filters['categories'] || []
      @selectedSubFilters = filters['subFilters'] || []
      @household = filters['household'] || nil
      @type = filters['type'];
      @currentMainIncomes = @main_incomes[@type.to_sym]
    else
      @type = 'households'
      @currentMainIncomes = @main_incomes[:households]
    end

    # common filters here
    @main_income_options = {
      name: 'main_income',
      label: 'Main income type',
      children: @currentMainIncomes
    }

    if @type == 'households'
       # households filters here

      @filters.push(@main_income_options)

    else
      # individuals filters here

      @gender_options = {
        name: 'gender',
        label: 'Gender',
        children: [{
          name: 'male',
          value: 'male'
        },
        {
          name: 'female',
          value: 'female'
        }]
      }

      @age_options = {
        name: 'age',
        label: 'Age',
        children: [
          {
            name: '18-25',
            value: {
              min_age: 18,
              max_age: 25
            }
          },
          {
            name: '25-35',
            value: {
              min_age: 25,
              max_age: 35
            }
          },
          {
            name: '35-45',
            value: {
              min_age: 35,
              max_age: 45
            }
          },
          {
            name: '45-60',
            value: {
              min_age: 45,
              max_age: 60
            }
          },
          {
            name: '>60',
            value: {
              min_age: 60,
              max_age: 200
            }
          }
        ]
      }

    end

    gon.project_name = project_name
    gon.categories = JSON.parse @categories.to_json
    gon.selectedCategories = JSON.parse @selectedCategories.to_json
    gon.selectedSubFilters = JSON.parse @selectedSubFilters.to_json
  end

  def country_preview
    @countries = Country.all
    @country = Country.find_by(iso: params[:iso])
    @country_finscope = @country.finscope
    @country_financial_diaries = @country.financial_diaries
  end
end
