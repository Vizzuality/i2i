class Updates::BlogsController < ApplicationController
  before_action :set_blog, only: :show

  # GET /blogs
  # GET /blogs.json
  def index
    @blogs = Blog.published.order(date: :DESC)
    @categories = Category.all
  end

  # GET /blog/1
  # GET /blog/1.json
  def show
    @post = Blog.published.friendly.find(params[:id])
    @post.author = @post.custom_author.present? ? @post.custom_author : @post.author
    @related_posts = related_posts
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

    saved_blog = Blog.find_by(title: session[:data]['title'])
    image_changed = session[:data][:image].original_filename != saved_blog.image.original_filename if saved_blog.present?

    if saved_blog.present? && !image_changed
      saved_blog.title = session[:data]['title']
      saved_blog.author = session[:data]['author']
      saved_blog.workstream = session[:data]['workstream']
      saved_blog.summary = session[:data]['summary']
      saved_blog.content = session[:data]['content']
      saved_blog.date = session[:data]['date']
      saved_blog.issuu_link = session[:data]['issuu_link']
      saved_blog.published = session[:data]['published']
      saved_blog.custom_author = session[:data]['custom_author']
      saved_blog.category_id = session[:data]['category_id']

      @insight = saved_blog
    else
      @insight = Blog.new(
        title: session[:data]['title'],
        author: session[:data]['author'],
        workstream: session[:data]['workstream'],
        summary: session[:data]['summary'],
        content: session[:data]['content'],
        date: session[:data]['date'],
        issuu_link: session[:data]['issuu_link'],
        published: session[:data]['published'],
        custom_author: session[:data]['custom_author'],
        category_id: session[:data]['category_id'],
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
  def set_blog
    @news = Blog.friendly.find(params[:id])
  end

  def related_posts
    @related_posts = Blog.published.where.not(id: params[:id]).limit(4)
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def blog_params
    params.fetch(:news, {})
  end
end
