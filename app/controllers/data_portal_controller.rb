class DataPortalController < ApplicationController
  def index
    @countries = Country.all
  end

  def country_preview
    @country = Country.find_by(iso: params[:iso])
    @country_finscope = @country.finscope
    @country_financial_diaries = @country.financial_diaries
  end

  def show
  end
end
