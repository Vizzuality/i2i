module Api
  class HouseholdTransactionsController < ApiController
    # before_action :require_login

    def index
      household_transactions = HouseholdTransaction.filter(params.slice(:project_name, :household_name, :category_name, :category_type, :subcategory))
      # household_transactions = household_transactions.page(params[:page]).per(params[:per_page])

      render json: household_transactions, adapter: :json, root: 'data'
    end
  end
end