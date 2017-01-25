class StaticPagesController < ApplicationController
  def home
  end

  def about
  end

  def community
  end

  def data_portal
    @countries = Country.all
  end
end
