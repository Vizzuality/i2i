class DataPortalFinancialDiariesController < ApplicationController
  def index
    country_iso = params[:iso]
    project_metadatum = ProjectMetadatum.find_by(country_iso3: country_iso)
    project_name = project_metadatum.project_name
    @has_households = project_metadatum.num_households_in_hh.present?
    @has_members = project_metadatum.num_members_in_mem.present?
    @countries = Country.all.select { |country| country.financial_diaries.present? }
    @country = Country.find_by(iso: params[:iso])
    @lift_countries = [
      { name: 'Uganda', url: 'https://www.lift-fedu.com/' },
      { name: 'Ghana', url: 'https://www.lift-data.com/' }
    ]
    @country_financial_diaries = @country.financial_diaries
    @categories = HouseholdTransaction.category_tree(project_name).present? ? HouseholdTransaction.category_tree(project_name) : HouseholdMemberTransaction.category_tree(project_name)
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

      @householdChart = filters['detailsChart'] || nil
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
      children: @currentMainIncomes || []
    }

    @income_tier_options = {
      name: 'income_tier',
      label: 'Income level',
      children: @currentIncomeRanges || []
    }

    if @type == 'households'
       # households filters here

      @filters.push(@main_income_options, @income_tier_options)
      @type = 'individuals' unless @has_households
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
        name: 'age_range',
        label: 'Age',
        children: [
          {
            name: '18-25',
            value: 1
          },
          {
            name: '25-35',
            value: 2
          },
          {
            name: '35-45',
            value: 3
          },
          {
            name: '45-60',
            value: 4
          },
          {
            name: '>60',
            value: 5
          }
        ]
      }


      @filters.push(
        @gender_options,
        @age_options
      )
    end

    gon.iso = country_iso;
    gon.project_name = project_name
    gon.type = @type
    gon.categories = JSON.parse @categories.to_json
    gon.selectedCategories = JSON.parse @selectedCategories.to_json
    gon.selectedSubFilters = JSON.parse @selectedSubFilters.to_json
  end

  def country_preview
    @countries = Country.all.map(&:finscope).compact
    @country = Country.find_by(iso: params[:iso])
    @country_finscope = @country.finscope
    @country_financial_diaries = @country.financial_diaries

    @partners = @country.partners.order(:name)

    @country_carrier = CountryCarrier.new(@country)

    @capital = CapitalCity.find_by(country_iso: @country.iso)
    @commodities = Commodity.find_by(country_iso: @country.iso)
  end
end
