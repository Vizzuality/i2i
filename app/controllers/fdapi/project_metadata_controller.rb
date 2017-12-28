module Fdapi
  class ProjectMetadataController < ApiController
    # before_action :require_login

    def index
      project_metadata = ProjectMetadatum.filter(params.slice(:project_name))
      project_metadata = project_metadata.page(params[:page]).per(params[:per_page])

      render json: project_metadata, adapter: :json, meta: meta(project_metadata), root: 'data'
    end

    def project_min_max_households
      categories_filter = JSON.parse(params[:categories])
      cache_key = "project_min_max_households-#{params.slice(:project_name, :household_name).to_json}-#{categories_filter}"

      selected_values = {}

      data = Rails.cache.fetch(cache_key) do
        project_metadata = ProjectMetadatum.find_by(project_name: params[:project_name])

        household_transactions = categories_filter.map do |category|
          if category['selected_value'].present?
            selected_values[category['category_type']] = category.delete('selected_value')
          end

          HouseholdTransaction.filter(params.slice(:project_name, :household_name).merge(category))
        end.flatten

        categories_filter.pluck('category_type').each do |category_type|
          unless selected_values[category_type].present?
            selected_values[category_type] = default_indicators[category_type]
          end
        end

        adapter = ActiveRecord::Base.connection

        sql_result = adapter.execute("select household_transactions.category_type,
            #{selected_values.values.map { |v| "min(#{v}), max(#{v})" }.join(', ')}
            from household_transaction_histories inner join household_transactions
            on household_transactions.id = household_transaction_histories.household_transaction_id
            where household_transactions.id in(#{household_transactions.pluck(:id).join(', ')})
            and household_transaction_histories.date >= '#{project_metadata.start_date}'
            and household_transaction_histories.date <= '#{project_metadata.end_date}'
            group by household_transactions.category_type")

        data = []
        field_index = { category: 0 }

        selected_values.values.map do |v|
          ["min_#{v}", "max_#{v}"]
        end.flatten.each_with_index do |value, index|
          field_index[value] = index + 1
        end

        sql_result.values.each do |values|
          data << json_element('min',
                               values[field_index["min_#{selected_values[values.first]}"]],
                               values.first,
                               project_metadata.start_date.strftime('%Y-%m-%d'),
                               project_metadata.currency_symbol)
          data << json_element('max',
                               values[field_index["max_#{selected_values[values.first]}"]],
                               values.first,
                               project_metadata.start_date.strftime('%Y-%m-%d'),
                               project_metadata.currency_symbol)
        end

        data
      end

      render json: { data: data }
    end

    def project_min_max_members
      categories_filter = JSON.parse(params[:categories])
      cache_key = "project_min_max_members-#{params.slice(:project_name, :household_name).to_json}-#{categories_filter}"

      selected_values = {}

      data = Rails.cache.fetch(cache_key) do
        project_metadata = ProjectMetadatum.find_by(project_name: params[:project_name])

        household_member_transactions = categories_filter.map do |category|
          if category['selected_value'].present?
            selected_values[category['category_type']] = category.delete('selected_value')
          end

          HouseholdMemberTransaction.filter(params.slice(:project_name, :household_name).merge(category))
        end.flatten

        categories_filter.pluck('category_type').each do |category_type|
          unless selected_values[category_type].present?
            selected_values[category_type] = default_indicators[category_type]
          end
        end

        adapter = ActiveRecord::Base.connection

        sql_result = adapter.execute("select household_member_transactions.category_type,
            #{selected_values.values.map { |v| "min(#{v}), max(#{v})" }.join(', ')}
            from household_member_transaction_histories inner join household_member_transactions
            on household_member_transactions.id = household_member_transaction_histories.household_member_transaction_id
            where household_member_transactions.id in(#{household_member_transactions.pluck(:id).join(', ')})
            and household_member_transaction_histories.date >= '#{project_metadata.start_date}'
            and household_member_transaction_histories.date <= '#{project_metadata.end_date}'
            group by household_member_transactions.category_type")

        data = []
        field_index = { category: 0 }

        selected_values.values.map do |v|
          ["min_#{v}", "max_#{v}"]
        end.flatten.each_with_index do |value, index|
          field_index[value] = index + 1
        end

        sql_result.values.each do |values|
          data << json_element('min',
                               values[field_index["min_#{selected_values[values.first]}"]],
                               values.first,
                               project_metadata.start_date.strftime('%Y-%m-%d'),
                               project_metadata.currency_symbol)
          data << json_element('max',
                               values[field_index["max_#{selected_values[values.first]}"]],
                               values.first,
                               project_metadata.start_date.strftime('%Y-%m-%d'),
                               project_metadata.currency_symbol)
        end

        data
      end

      render json: { data: data }
    end

    def project_means_households
      categories_filter = JSON.parse(params[:categories])
      cache_key = "project_means_households-#{params.slice(:project_name, :household_name).to_json}-#{categories_filter}"

      selected_values = {}

      result = Rails.cache.fetch(cache_key) do
        project_metadata = ProjectMetadatum.find_by(project_name: params[:project_name])
        adapter = ActiveRecord::Base.connection
        histories = {}
        result = []

        household_transactions = categories_filter.map do |category|
          if category['selected_value'].present?
            selected_values[category['category_type']] = category.delete('selected_value')
          end

          { category['category_type'] => HouseholdTransaction.filter(params.slice(:project_name, :household_name).merge(category)) }
        end

        household_transactions.each do |household|
          category_type = household.keys.first
          indicator = get_indicator(selected_values, category_type)

          histories[category_type] = adapter.execute("select * from household_transaction_histories
            where household_transaction_id in (#{household.values.first.pluck(:id).join(', ')})
            and date >= '#{project_metadata.start_date}'
            and date <= '#{project_metadata.end_date}'
            and #{indicator} is not null")
        end

        sorted = {}
        histories.each do |category_type, pg_result|
          scores = {}
          pg_result.to_a.each { |history| (scores[history['year']] ||= {})[history['month']]=[] }
          sorted[category_type] = scores
        end

        histories.each do |category_type, pg_result|
          pg_result.to_a.each { |history| sorted[category_type][history['year']][history['month']] << history }
        end

        sorted.each do |category_type, value|
          value.each do |year, value|
            value.each do |month, histories|
              indicator = get_indicator(selected_values, category_type)

              values = histories.map { |h| h[indicator] }

              result << {
                category_type: category_type,
                max: values.max,
                min: values.min,
                median: values.sum / values.size.to_f,
                date: "#{year}-#{month.to_s.rjust(2, '0')}-01"
              }
            end
          end
        end

        result.sort_by { |h| h[:date] }
      end

      render json: { data: result }
    end

    def project_means_members
      categories_filter = JSON.parse(params[:categories])
      cache_key = "project_means_members-#{params.slice(:project_name, :household_name).to_json}-#{categories_filter}"

      selected_values = {}

      result = Rails.cache.fetch(cache_key) do
        project_metadata = ProjectMetadatum.find_by(project_name: params[:project_name])
        adapter = ActiveRecord::Base.connection
        histories = {}
        result = []

        household_member_transactions = categories_filter.map do |category|
          if category['selected_value'].present?
            selected_values[category['category_type']] = category.delete('selected_value')
          end

          { category['category_type'] => HouseholdMemberTransaction.filter(params.slice(:project_name, :household_name).merge(category)) }
        end

        household_member_transactions.each do |household|
          category_type = household.keys.first
          indicator = get_indicator(selected_values, category_type)

          histories[category_type] = adapter.execute("select * from household_member_transaction_histories
            where household_member_transaction_id in (#{household.values.first.pluck(:id).join(', ')})
            and date >= '#{project_metadata.start_date}'
            and date <= '#{project_metadata.end_date}'
            and #{indicator} is not null")
        end

        sorted = {}
        histories.each do |category_type, pg_result|
          scores = {}
          pg_result.to_a.each { |history| (scores[history['year']] ||= {})[history['month']]=[] }
          sorted[category_type] = scores
        end

        histories.each do |category_type, pg_result|
          pg_result.to_a.each { |history| sorted[category_type][history['year']][history['month']] << history }
        end

        sorted.each do |category_type, value|
          value.each do |year, value|
            value.each do |month, histories|
              indicator = get_indicator(selected_values, category_type)

              values = histories.map { |h| h[indicator] }

              result << {
                category_type: category_type,
                max: values.max,
                min: values.min,
                median: values.sum / values.size.to_f,
                date: "#{year}-#{month.to_s.rjust(2, '0')}-01"
              }
            end
          end
        end

        result.sort_by { |h| h[:date] }
      end

      render json: { data: result }
    end

    def get_indicator(selected_values, category_type)
      selected_values[category_type] || default_indicators[category_type]
    end

    def json_element(operation, value, category, date, unit)
      {
        c: operation,
        date: date,
        value: value,
        category: category,
        unit: unit
      }
    end
  end
end
