module Fdapi
  class HouseholdMemberTransactionsController < ApiController
    def index
      categories_filter = JSON.parse(params[:categories])
      cache_key = "household_member_transactions-" +
                  "#{params.slice(:project_name, :household_name, :main_income, :gender, :age_range, :income_tier).to_json}-" +
                  "#{categories_filter}"

      household_member_transactions = Rails.cache.fetch(cache_key) do
        categories_filter.map do |category|
          category.merge!({ category_name: 'ALL' }) unless category['subcategory'].present?
          transactions = HouseholdMemberTransaction.filter(params.slice(:project_name, :household_name, :gender)
                                    .merge(category))
                                    .includes(:household_member_transaction_histories_with_values)
          if params[:age_range].present?
            ages_ranges = {
              '1' => {
                min: 18,
                max: 25
              },
              '2' => {
                min: 25,
                max: 35
              },
              '3' => {
                min: 35,
                max: 45
              },
              '4' => {
                min: 45,
                max: 60
              },
              '5' => {
                min: 60,
                max: 200
              }
            }

            selected_range = ages_ranges[params[:age_range]]

            transactions = transactions.where(age: selected_range[:min]..selected_range[:max])
          end

          if params[:income_tier].present?
            members_within_tier = HouseholdMemberTransaction.members_within_tier(params[:project_name], params[:income_tier])

            ids = members_within_tier.map do |household_member|
              transactions.where(household_name: household_member[0],
                                 person_code: household_member[1])
            end.flatten.pluck(:id)

            # Making it an activerecord collection again, otherwise I can't query it anymore. Am I proud? NO! Does it work? Maybe...
            transactions = HouseholdMemberTransaction.where(id: ids)
          end

          if params[:main_income].present?
            members = MemberSubcategoryIncome.members_with_main(params[:main_income], params[:project_name])

            transactions = members.map do |household_member|
              transactions.where(household_name: household_member[0],
                                 person_code: household_member[1])
            end
          end

          transactions
        end.flatten
      end

      render json: household_member_transactions, adapter: :json, root: :data
    end

    def monthly_values
      project_name = params[:project_name]
      project_metadata = ProjectMetadatum.find_by(project_name: project_name)
      person_code = params[:household]
      categories = JSON.parse(params[:categories])
      cache_key = "member_monthly_values-#{project_name}-#{person_code}-#{categories}"

      response = Rails.cache.fetch(cache_key) do
        response = []

        categories.each do |category|
          category_type = category['category_type']

          transactions = HouseholdMemberTransaction
                          .with_subcategory
                          .project_name(project_name)
                          .category_type(category_type)

          if person_code.present?
            transactions = transactions.person_code(person_code)
          end

          if category['subcategory'].present?
            transactions = transactions.subcategory(category['subcategory'])
          end

          grouped = transactions.group_by { |transaction| transaction.subcategory }

          grouped.each do |subcategory, transactions|
            indicator = default_indicators[category_type]

            grouped_histories = HouseholdMemberTransactionHistory.
              select("year, month, SUM(#{indicator}) AS #{indicator}").
              where(household_member_transaction_id: transactions.pluck(:id)).
              with_indicator(indicator).
              where(date: project_metadata.start_date..project_metadata.end_date).
              group('year, month')
            grouped_histories.each do |histories|
              value = histories.send(indicator)
              date = "#{histories.year}-#{histories.month.to_s.rjust(2, '0')}-01"
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
