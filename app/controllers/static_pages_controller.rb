class StaticPagesController < ApplicationController
  def data_portal
    @countries = Country.all
  end

  def about
  end
end
