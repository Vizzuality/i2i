class DataPortalFinancialDiariesEmbedController < ApplicationController
  after_action :allow_iframe, only: :index

  def index
    country_iso = params[:iso]
    project_name = ProjectMetadatum.find_by(country_iso3: country_iso).project_name


    gon.project_name = project_name
  end

  private

   def allow_iframe
      response.headers.except! 'X-Frame-Options'
    end
end
