module Fdapi
  class HouseholdsController < ApiController
    def main_incomes
      project_name = params[:project_name]
      incomes = HouseholdSubcategoryIncome.main_incomes(project_name)

      render json: { data: incomes }
    end
  end
end