module Api
  module V1
    class HouseholdTransactionsController < ApplicationController
      def index
        household_transactions = HouseholdTransaction.filter(params.slice(:project_name, :household_name, :category_name, :category_type, :subcategory))
        household_transactions = household_transactions.page(params[:page])

        render json: household_transactions, adapter: :json, meta: meta(household_transactions)
      end
    end
  end
end
