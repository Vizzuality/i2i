class DatasetsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @iso = 'GHA'
    @country = Country.find_by(iso: @iso)
    
    # Categories enum for select:
    # [["Health", "health"], ["Finance", "finance"], ["Agriculture", "agriculture"], ["Education", "education"], ["Other", "other"]]
    @categories = Dataset.categories.map {|name, _| [name.humanize, name] }
    
    @countries = Country.all
    @latest_year = @country.finscope[:latest_year] rescue nil
    
    @datasets = current_user.datasets
                  .order(:created_at)
                  .as_json(methods: %i(file_absolute_url csv_errors is_valid_for_preview csv_is_valid))
    
    respond_to do |format|
      format.html { render layout: 'data_portal' }
      format.json { render json: current_user.datasets, methods: %i(file_absolute_url csv_errors is_valid_for_preview csv_is_valid) }
    end
  end
  
  def create
    dataset = current_user.datasets.create(dataset_params)
    render json: dataset, methods: %i(file_absolute_url csv_errors is_valid_for_preview csv_is_valid)
  end
  
  def destroy
    dataset = Dataset.find(params[:id])
    
    if dataset.published?
      DeleteDatasetFromCarto.new(dataset.id).perform
    end
    
    dataset.destroy
  end
  
  def update
    dataset = Dataset.find(params[:id])
    unless dataset.published?
      dataset.update(dataset_params)
    end
    
    render json: dataset, methods: %i(file_absolute_url csv_errors is_valid_for_preview csv_is_valid)
  end
  
  def publish
    dataset = Dataset.find(params[:id])
    dataset.update(status: :pending)

    render json: dataset, methods: %i(file_absolute_url csv_errors is_valid_for_preview csv_is_valid)
  end
  
  private
  
  def dataset_params
    params.require(:dataset).permit(:id, :name, :country_id, :category, :file)
  end
end
