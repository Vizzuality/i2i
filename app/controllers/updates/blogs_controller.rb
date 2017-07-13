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
    @post = Blog.new(session[:post])
    @RelatedPosts = related_posts

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
