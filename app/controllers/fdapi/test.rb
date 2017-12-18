  def project_min_max_households
      categories_filter = JSON.parse(params[:categories])
      cache_key = "project_min_max_households-#{params.slice(:project_name, :household_name).to_json}-#{categories_filter}"

      data = Rails.cache.fetch(cache_key) do
        project_metadata = ProjectMetadatum.find_by(project_name: params[:project_name])

        household_transactions = categories_filter.map do |category|
          HouseholdTransaction.filter(params.slice(:project_name, :household_name).merge(category))
        end.flatten

        adapter = ActiveRecord::Base.connection

        sql_result = adapter.execute("select household_transactions.category_type,
            min(household_transaction_histories.rolling_balance), min(total_transaction_value),
            max(household_transaction_histories.rolling_balance), max(total_transaction_value)
            from household_transaction_histories inner join household_transactions
            on household_transactions.id = household_transaction_histories.household_transaction_id
            where household_transactions.id in(#{household_transactions.pluck(:id).join(', ')})
            and household_transaction_histories.date >= '#{project_metadata.start_date}'
            and household_transaction_histories.date <= '#{project_metadata.end_date}'
            group by household_transactions.category_type")

        data = []
        field_index =
          { category: 0, min_rolling: 1, min_total: 2, max_rolling: 3, max_total: 4}

        sql_result.values.each do |values|
          case values[field_index[:category]]
          when 'credit', 'savings'
            data << json_element('min', values[field_index[:min_rolling]],
                                 values[field_index[:category]],
                                 project_metadata.start_date.strftime('%Y-%m-%d'),
                                 project_metadata.currency_symbol)
            data << json_element('max', values[field_index[:max_rolling]],
                                 values[field_index[:category]],
                                 project_metadata.end_date.strftime('%Y-%m-%d'),
                                 project_metadata.currency_symbol)
          when 'expense', 'income'
            data << json_element('min', values[field_index[:min_total]],
                                 values[field_index[:category]],
                                 project_metadata.start_date.strftime('%Y-%m-%d'),
                                 project_metadata.currency_symbol)
            data << json_element('max', values[field_index[:max_total]],
                                 values[field_index[:category]],
                                 project_metadata.end_date.strftime('%Y-%m-%d'),
                                 project_metadata.currency_symbol)
          end
        end

        data
      end

      render json: { data: data }
    end