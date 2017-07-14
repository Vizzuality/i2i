class Updates::EventsController < ApplicationController
  before_action :set_event, only: :show

  # GET /events
  # GET /events.json
  def index
    @events = Event.order(date: :DESC)
  end

  # GET /event/1
  # GET /event/1.json
  def show
    @event = Event.friendly.find(params[:id])
    @RelatedEvents = related_events
  end

  def preview
    unless session[:skip_image]
      unless session[:has_image]
        image = session[:data]['image']
        tempfile = Tempfile.new('image')
        tempfile.binmode
        tempfile.write(Base64.decode64(image.tempfile))
        image = ActionDispatch::Http::UploadedFile.new(tempfile: tempfile, filename: image.original_filename, type: image.content_type, head: image.headers)
        session[:data][:image] = image
      end
    end

    @event = Event.new(session[:data])
    @event.image.save unless session[:has_image]
    @RelatedEvents = related_events

    session[:data] = nil
    session[:has_image] = nil
    session[:skip_image] = nil
    render 'show'
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @news = Event.friendly.find(params[:id])
  end

  def related_events
    Event.all.where.not(id: params[:id]).limit(4)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def event_params
    params.fetch(:news, {})
  end
end
