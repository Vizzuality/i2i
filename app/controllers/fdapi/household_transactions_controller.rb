module Fdapi
  class HouseholdTransactionsController < ApiController
    def index
      categories_filter = JSON.parse(params[:categories])
      cache_key = "household_transactions-#{params.slice(:project_name, :household_name, :main_income, :income_tier).to_json}-#{categories_filter}"

      household_transactions = Rails.cache.fetch(cache_key) do
        categories_filter.map do |category|
          category.merge!({ category_name: 'ALL' }) unless category['subcategory'].present?
          transactions = HouseholdTransaction.filter(params.slice(:project_name, :household_name)
                                             .merge(category))
                                             .includes(:household_transaction_histories_with_values)

          if params[:income_tier].present?
            households_within_tier = HouseholdTransaction.households_within_tier(params[:project_name], params[:income_tier])
            transactions = transactions.where(household_name: households_within_tier)
          end

          if params[:main_income].present?
            households = HouseholdSubcategoryIncome.households_with_main(params[:main_income], params[:project_name])
            transactions = transactions.where(household_name: households)
          end

          transactions
        end.flatten
      end

      render json: household_transactions, adapter: :json, root: :data
    end

    def monthly_values
      project_name = params[:project_name]
      project_metadata = ProjectMetadatum.find_by(project_name: project_name)
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
              transaction
                .household_transaction_histories
                .with_indicator(indicator)
                .where(date: project_metadata.start_date..project_metadata.end_date)
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