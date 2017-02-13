class StaticPagesController < ApplicationController
  def data_portal
    @countries = Country.all
  end

  def about
    render :layout => 'static_pages'
  end
end
