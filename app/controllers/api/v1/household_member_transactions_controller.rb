module Api
  module V1
    class HouseholdMemberTransactionsController < ApplicationController
      def index
        household_member_transactions = HouseholdMemberTransaction.filter(params.slice(:project_name, :household_name, :category_name, :category_type, :subcategory))
        household_member_transactions = household_member_transactions.page(params[:page])

        render json: household_member_transactions, adapter: :json, meta(household_member_transactions)
      end
    end
  end
end
