module Fdapi
  class HouseholdTransactionsController < ApiController

    def index
      categories_filter = JSON.parse(params[:categories])
      household_transactions = []

      # query_array = []

      categories_filter.each do |category|
        household_transactions << HouseholdTransaction.filter(params.slice(:project_name, :household_name).merge(category))
        # subquery = []
        # category.each do |condition|
        #   if %w(category_type category_name subcategory).include? condition[0]
        #     subquery << "#{condition[0]} = '#{condition[1]}'"
        #   end
        # end
        # query_array << subquery
      end

      # query = ''
      #query_array.each do |ors|
      #  query += ' ('
      #  query += ors.join(' AND ')
      #  query += ') '
      #end

      # query = '(( ' + query_array.map {|x| x.join('  AND  ')}.join(' ) OR ( ') + '))'
      # puts query

      # household_transactions = HouseholdTransaction.where(project_name: params[:project_name]).where(query)

      render json: household_transactions.flatten, adapter: :json, root: 'data'
    end
  end
end