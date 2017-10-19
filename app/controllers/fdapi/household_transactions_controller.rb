module Fdapi
  class HouseholdTransactionsController < ApiController

    def index
      categories_filter = JSON.parse(params[:categories])

      household_transactions = categories_filter.map do |category|
        HouseholdTransaction.filter(params.slice(:project_name, :household_name).merge(category)).includes(:household_transaction_histories)
      end.flatten

      render json: household_transactions, adapter: :json, root: 'data'
    end
  end
end