class StaticPagesController < ApplicationController
  def data_portal
    @countries = Country.all
  end
end
