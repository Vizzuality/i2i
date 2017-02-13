class StaticPagesController < ApplicationController
  def home
  end

  def about
    render :layout => 'static_pages'
  end

  def community
  end

  def data_portal
    @countries = Country.all
  end
end
