class RegionsController < ApplicationController
  def show
    @region = Region.friendly.find(params[:iso])
  end
end
