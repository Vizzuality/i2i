class DataPortalController < ApplicationController
  def index
    @countries = Country.all
  end

  def show
    @countries = Country.all.map(&:finscope).compact
    @country = Country.find_by(iso: params[:iso])
    @country_latest_year = @countries.find do |c|
      c[:iso] == @country.iso
    end[:latest_year].to_s
  end
end
