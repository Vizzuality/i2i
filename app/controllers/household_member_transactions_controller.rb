class HouseholdMemberTransactionsController < ApiController
  before_action :require_login

  def index
    household_member_transactions = HouseholdMemberTransaction.filter(params.slice(:project_name, :household_name, :category_name, :category_type, :subcategory))
    household_member_transactions = household_member_transactions.page(params[:page]).per(params[:per_page])

    render json: household_member_transactions, adapter: :json, meta: meta(household_member_transactions)
  end
end
