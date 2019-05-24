class DataPortal::IndicatorController < ApplicationController
  before_action :allow_iframe_requests

  def show
    @source = params['source']

    render :layout => 'embed'
  end

  def embed
    render :layout => 'embed'
  end

  private

  def allow_iframe_requests
    response.headers.delete('X-Frame-Options')
  end
end
