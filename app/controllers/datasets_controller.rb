class DatasetsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @iso = 'GHA'
    @country = Country.find_by(iso: @iso)
    @categories = Category.all
    @countries = Country.where(has_fsp_maps: true)
    @latest_year = @country.finscope[:latest_year] rescue nil
    
    @datasets = current_user.datasets
    
    respond_to do |format|
      format.html { render layout: 'data_portal' }
      format.json { render json: current_user.datasets }
    end
  end
  
  def create
    dataset = current_user.datasets.create(dataset_params)
    render json: dataset
  end
  
  def destroy
    dataset = Dataset.find(params[:id])
    dataset.destroy
  end
  
  def update
    dataset = Dataset.find(params[:id])
    dataset.update(dataset_params)
    
    render json: dataset
  end
  
  private
  
  def dataset_params
    params.require(:dataset).permit(:id, :name, :country_id, :category_id, :file)
  end
end
