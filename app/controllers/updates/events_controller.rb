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
    
    saved_event = Event.find_by(title: session[:data]['title'])
    image_changed = session[:data][:image].original_filename != saved_event.image.original_filename if saved_event.present?

    if saved_event.present? && !image_changed
      saved_event.title = session[:data]['title']
      saved_event.author = session[:data]['author']
      saved_event.url = session[:data]['url']
      saved_event.summary = session[:data]['summary']
      saved_event.content = session[:data]['content']
      saved_event.date = session[:data]['date']
      saved_event.published = session[:data]['published']
      saved_event.custom_author = session[:data]['custom_author']
      saved_event.category_id = session[:data]['category_id']
      saved_event.is_featured = session[:data]['is_featured']

      @insight = saved_event
    else
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
    end

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
