module Fdapi
  class HouseholdMemberTransactionsController < ApiController

    def index
      categories_filter = JSON.parse(params[:categories])
      
      household_member_transactions = categories_filter.map do |category|
        HouseholdMemberTransaction.filter(params.slice(:project_name, :household_name).merge(category)).includes(:household_member_transaction_histories)
      end.flatten

      render json: household_member_transactions, adapter: :json, root: 'data'
    end
  end
end