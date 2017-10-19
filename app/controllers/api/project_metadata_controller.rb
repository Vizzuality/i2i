module Api
  class ProjectMetadataController < ApiController
    # before_action :require_login

    def index
      project_metadata = ProjectMetadatum.filter(params.slice(:project_name))
      project_metadata = project_metadata.page(params[:page]).per(params[:per_page])

      render json: project_metadata, adapter: :json, meta: meta(project_metadata), root: 'data'
    end

    def project_min_max
      project_metadata = ProjectMetadatum.find_by(project_name: params[:project_name])
      household_transactions = HouseholdTransaction.filter(params.slice(:project_name, :household_name, :category_name, :category_type, :subcategory))
      adapter = ActiveRecord::Base.connection
      min_value = adapter.execute("select min(avg_value) from household_transaction_histories where household_transaction_id in(#{household_transactions.pluck(:id).join(', ')})")
      max_value = adapter.execute("select max(avg_value) from household_transaction_histories where household_transaction_id in(#{household_transactions.pluck(:id).join(', ')})")

      data = [
        {
          c: 'min',
          date: project_metadata.start_date.strftime('%Y-%m-%d'),
          value: min_value.values.flatten.first
        },
        {
          c: 'max',
          date: project_metadata.end_date.strftime('%Y-%m-%d'),
          value: max_value.values.flatten.first
        }
      ]

      render json: { data: data }
    end
  end
end