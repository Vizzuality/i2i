class StaticPagesController < ApplicationController
  def data_portal
    @countries = Country.all
  end

  def about
    @team = [
      {
        'name': 'Jeremy Soul',
        'desc': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'
      }
    ]
    render :layout => 'static_pages'
  end
end
