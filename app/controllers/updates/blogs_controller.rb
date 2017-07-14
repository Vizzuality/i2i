class Updates::BlogsController < ApplicationController
  before_action :set_blog, only: :show

  # GET /blogs
  # GET /blogs.json
  def index
    @blogs = Blog.order(date: :DESC)
  end

  # GET /blog/1
  # GET /blog/1.json
  def show
    @post = Blog.friendly.find(params[:id])
    @RelatedPosts = related_posts
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

    @post = Blog.new(session[:data])
    @post.image.save unless session[:has_image]
    @RelatedPosts = related_posts

    session[:data] = nil
    session[:has_image] = nil
    session[:skip_image] = nil
    render 'show'
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_blog
    @news = Blog.friendly.find(params[:id])
  end

  def related_posts
    @RelatedPosts = Blog.all.where.not(id: params[:id]).limit(4)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def blog_params
    params.fetch(:news, {})
  end
end
