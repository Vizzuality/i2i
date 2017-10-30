module Fdapi
  class MembersController < ApiController
    def main_incomes
      project_name = params[:project_name]
      incomes = MemberSubcategoryIncome.main_incomes(project_name)

      render json: { data: incomes }
    end
  end
end