class DataPortalController < ApplicationController
  def index
    @countries = Country.all
  end

  def show
    @countries = Country.all.map { |country| country.finscope }.compact
    @country = Country.find_by(iso: params[:iso])
  end
end
