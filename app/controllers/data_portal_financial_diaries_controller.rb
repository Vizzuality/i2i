class DataPortalFinancialDiariesController < ApplicationController
  def index
    country_iso = params[:iso]
    project_name = ProjectMetadatum.find_by(country_iso3: country_iso).project_name
    @countries = Country.all.select{ |country|
      country.financial_diaries.present? && country[:iso] != country_iso
    }
    @country = Country.find_by(iso: country_iso)
    @categories = HouseholdTransaction.category_tree(project_name)
    @project_quantities = ProjectMetadatum.quantities(country_iso)
    @selectedCategories = [{
      type: @categories.find { |cat| cat[:value] == "income" }[:value],
      subcategory: nil,
      visible: true
    }.stringify_keys]
    @selectedSubFilters = []
    @main_incomes = {
      households: HouseholdSubcategoryIncome.main_incomes(project_name),
      members: MemberSubcategoryIncome.main_incomes(project_name)
    }
    @income_ranges = {
      households: HouseholdIncomeTier.ranges(project_name),
      members: MemberIncomeTier.ranges(project_name)
    }

    @filters = [];

    if params[:p].present?
      filters = JSON.parse(Base64.decode64(params[:p]))
      @selectedCategories = filters['categories'] || []
      @selectedSubFilters = filters['subFilters'] || []
      @household = filters['household'] || nil
      @type = filters['type'];
      @currentMainIncomes = @main_incomes[@type.to_sym]
      @currentIncomeRanges = @income_ranges[@type.to_sym]
    else
      @type = 'households'
      @currentMainIncomes = @main_incomes[:households]
      @currentIncomeRanges = @income_ranges[:households]
    end

    # common filters here
    @main_income_options = {
      name: 'main_income',
      label: 'Main income type',
      children: @currentMainIncomes
    }

    @income_tier_options = {
      name: 'income_tier',
      label: 'Income level',
      children: @currentIncomeRanges
    }

    if @type == 'households'
       # households filters here

      @filters.push(@main_income_options, @income_tier_options)

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


      @filters.push(
        @main_income_options,
        @gender_options,
        @age_options,
        @income_tier_options)
    end

    gon.iso = country_iso;
    gon.project_name = project_name
    gon.categories = JSON.parse @categories.to_json
    gon.selectedCategories = JSON.parse @selectedCategories.to_json
    gon.selectedSubFilters = JSON.parse @selectedSubFilters.to_json
  end

  def country_preview
    @countries = Country.all
    @country = Country.find_by(iso: params[:iso])
    project_name = ProjectMetadatum.find_by(country_iso3: params[:iso]).project_name

    @country_finscope = @country.finscope
    @country_financial_diaries = @country.financial_diaries

    gon.project_name = project_name;
  end
end
