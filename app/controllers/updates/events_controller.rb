class Updates::EventsController < ApplicationController
  before_action :set_event, only: :show

  # GET /events
  # GET /events.json
  def index
    @events = Event.published.order(date: :DESC)
    @categories = Category.all
  end

  # GET /event/1
  # GET /event/1.json
  def show
    @event = Event.published.friendly.find(params[:id])
    @event.author = @event.custom_author.present? ? @event.custom_author : @event.author
    @related_events = related_events
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
    
    @insight = Event.new(
      title: session[:data]['title'],
      author: session[:data]['author'],
      url: session[:data]['url'],
      summary: session[:data]['summary'],
      content: session[:data]['content'],
      date: session[:data]['date'],
      published: session[:data]['published'],
      custom_author: session[:data]['custom_author'],
      category_id: session[:data]['category_id'],
      is_featured: session[:data]['is_featured'],
      image: session[:data]['image']
    )
    @insight.image.save unless session[:has_image]
    @related = []

    session[:data] = nil
    session[:has_image] = nil
    session[:skip_image] = nil
    render 'insights/show'
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_event
    @news = Event.friendly.find(params[:id])
  end

  def related_events
    Event.published.where.not(id: params[:id]).limit(4)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def event_params
    params.fetch(:news, {})
  end
end
