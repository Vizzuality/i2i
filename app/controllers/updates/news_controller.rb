class Updates::NewsController < ApplicationController
  before_action :set_news, only: :show

  # GET /news
  # GET /news.json
  def index
    @news = News.published.order(date: :DESC)
    @categories = Category.all
  end

  # GET /news/1
  # GET /news/1.json
  def show
    @news = News.published.friendly.find(params[:id])
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

    saved_news = News.find_by(title: session[:data]['title'])

    if saved_news.present?
      saved_news.title = session[:data]['title']
      saved_news.author = session[:data]['author']
      saved_news.summary = session[:data]['summary']
      saved_news.content = session[:data]['content']
      saved_news.date = session[:data]['date']
      saved_news.issuu_link = session[:data]['issuu_link']
      saved_news.published = session[:data]['published']
      saved_news.category_id = session[:data]['category_id']
      saved_news.is_featured = session[:data]['is_featured']

      @insight = saved_news
    else
      @insight = News.new(
        title: session[:data]['title'],
        author: session[:data]['author'],
        summary: session[:data]['summary'],
        content: session[:data]['content'],
        date: session[:data]['date'],
        issuu_link: session[:data]['issuu_link'],
        published: session[:data]['published'],
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
      News.published.where.not(id: params[:id]).limit(6)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def news_params
      params.fetch(:news, {})
    end
end
