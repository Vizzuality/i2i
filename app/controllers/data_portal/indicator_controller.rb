class DataPortal::IndicatorController < ApplicationController
  before_action :allow_iframe_requests

  def show
    render :layout => 'embed'
  end

  private
  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end

end
