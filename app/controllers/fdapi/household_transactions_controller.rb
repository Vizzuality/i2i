module Fdapi
  class HouseholdTransactionsController < ApiController

    def index
      categories_filter = JSON.parse(params[:categories])

      household_transactions = categories_filter.map do |category|
        HouseholdTransaction.filter(params.slice(:project_name, :household_name).merge(category)).includes(:household_transaction_histories)
      end.flatten

      render json: household_transactions, adapter: :json, root: 'data'
    end

    def monthly_values
      project_name = params[:project_name]
      household_name = params[:household]
      category_types = JSON.parse(params[:categories]).map { |cat| cat['category_type'] }
      response = []

      category_types.each do |category_type|
        transactions = HouseholdTransaction
                        .with_subcategory
                        .project_name(project_name)
                        .category_type(category_type)

        if household_name.present?
          transactions = transactions.household_name(household_name)
        end

        grouped = transactions.group_by { |transaction| transaction.subcategory }

        grouped.each do |subcategory, transactions|
          indicator = default_indicators[category_type]

          histories = transactions.map do |transaction|
            transaction.household_transaction_histories_all.with_indicator(indicator)
          end
          .flatten
          .group_by { |hist| "#{hist.year}-#{hist.month.to_s.rjust(2, '0')}-01" }

          histories.each do |date, histories|
            value = histories.pluck(indicator).compact.reduce(:+)
            response << monthly_json(subcategory, date, value, category_type)
          end
        end
      end

      response.sort_by! { |v| v[:date] }

      render json: { data: response }
    end

    def monthly_json(subcategory, date, value, category_type)
      {
        subcategory: subcategory,
        date: date,
        value: value,
        category_type: category_type
      }
    end
  end
end