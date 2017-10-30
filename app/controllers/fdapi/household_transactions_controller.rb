module Fdapi
  class HouseholdTransactionsController < ApiController
    def index
      categories_filter = JSON.parse(params[:categories])
      cache_key = "household_transactions-#{params.slice(:project_name, :household_name, :main_income).to_json}-#{categories_filter}"

      household_transactions = Rails.cache.fetch(cache_key) do
        households = HouseholdSubcategoryIncome.households_with_main(params[:main_income], params[:project_name]) if params[:main_income].present?

        categories_filter.map do |category|
          category.merge!({ category_name: 'ALL' }) unless category['subcategory'].present?
          transactions = HouseholdTransaction.filter(params.slice(:project_name, :household_name)
                                             .merge(category))
                                             .includes(:household_transaction_histories)

          transactions = transactions.where(household_name: households) if households.present?

          transactions
        end.flatten
      end

      render json: { data: household_transactions }
    end

    def monthly_values
      project_name = params[:project_name]
      household_name = params[:household]
      categories = JSON.parse(params[:categories])
      cache_key = "household_monthly_values-#{project_name}-#{household_name}-#{categories}"

      response = Rails.cache.fetch(cache_key) do
        response = []

        categories.each do |category|
          category_type = category['category_type']

          transactions = HouseholdTransaction
                          .with_subcategory
                          .project_name(project_name)
                          .category_type(category_type)

          if household_name.present?
            transactions = transactions.household_name(household_name)
          end

          if category['subcategory'].present?
            transactions = transactions.subcategory(category['subcategory'])
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
      end

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