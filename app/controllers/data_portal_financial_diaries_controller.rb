class DataPortalFinancialDiariesController < ApplicationController
  include FinscopeApi

  def index

    # categories mockup
    @categories = [
      {
        name: 'Savings',
        children: [
          { name: 'Savings informal house' },
          { name: 'Savings informal Rosca' },
          { name: 'Savings informal Asca' }
        ]
      },
      {
        name: 'Credits',
        children: [
          { name: 'Credit formal bank' },
          { name: 'Credit informal moneylender' }
        ]
      },
      {
        name: 'Incomes',
        children: []
      }
    ]

    @country = FinscopeApi.get_countries.find{ |c| c[:iso] == params[:iso] }
    @categories = CategoryUsage.categories_with_children
    @project_quantities = ProjectMetadatum.quantities
  end
end
