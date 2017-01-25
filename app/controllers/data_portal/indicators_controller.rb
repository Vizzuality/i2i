class DataPortal::IndicatorsController < DataPortalController
  before_action :set_indicator, only: [:show, :edit, :update, :destroy]

  def show
  end

  private
  def set_indicator
    @indicator = Indicator.find(params[:id])
  end
end