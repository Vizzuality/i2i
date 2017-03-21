class Updates::EventsController < ApplicationController
  before_action :set_event, only: :show

  # GET /events
  # GET /events.json
  def index
    @events = Event.limit(16).order(date: :DESC)
  end

  # GET /event/1
  # GET /event/1.json
  def show
    @event = Event.find(params[:id])
    @RelatedEvents = Event.all.where.not(id: params[:id]).limit(4)
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
