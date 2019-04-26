class RegionsController < ApplicationController
  def show
    @region = Region.includes(:countries, :partners).friendly.find(params[:iso])
    
    @countries = @region.countries.order(:name)
    @partners = @region.partners.order(:name)
  end
end
