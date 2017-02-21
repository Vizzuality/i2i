class Updates::EventsController < ApplicationController
  before_action :set_event, only: :show

  # GET /events
  # GET /events.json
  def index
    @events = Event.all
  end

  # GET /event/1
  # GET /event/1.json
  def show
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @news = Event.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def event_params
    params.fetch(:news, {})
  end
end
