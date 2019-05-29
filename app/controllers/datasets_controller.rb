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
    
    @datasets = current_user.datasets.order(:created_at).as_json(methods: :file_absolute_url)
    
    respond_to do |format|
      format.html { render layout: 'data_portal' }
      format.json { render json: current_user.datasets, methods: :file_absolute_url }
    end
  end
  
  def create
    dataset = current_user.datasets.create(dataset_params)
    render json: dataset, methods: :file_absolute_url
  end
  
  def destroy
    dataset = Dataset.find(params[:id])
    dataset.destroy
  end
  
  def update
    dataset = Dataset.find(params[:id])
    dataset.update(dataset_params)
    
    render json: dataset, methods: :file_absolute_url
  end
  
  def publish
    dataset = Dataset.find(params[:id])
    dataset.update(status: :pending)

    render json: dataset, methods: :file_absolute_url
  end
  
  private
  
  def dataset_params
    params.require(:dataset).permit(:id, :name, :country_id, :category, :file)
  end
end
