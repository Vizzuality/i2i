class Updates::NewsController < ApplicationController
  before_action :set_news, only: :show

  # GET /news
  # GET /news.json
  def index
    @news = News.order(date: :DESC)
  end

  # GET /news/1
  # GET /news/1.json
  def show
    @news = News.friendly.find(params[:id])
    @related_news = related_news
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

    @news = News.new(session[:data])
    @news.image.save unless session[:has_image]
    @related_news = related_news

    session[:data] = nil
    session[:has_image] = nil
    session[:skip_image] = nil
    render 'show'
  end

  # GET /news/new
  def new
    @news = News.new
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_news
      @news = News.friendly.find(params[:id])
    end

    def related_news
      News.all.where.not(id: params[:id]).limit(3)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def news_params
      params.fetch(:news, {})
    end
end
