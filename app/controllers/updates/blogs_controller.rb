class Updates::BlogsController < ApplicationController
  before_action :set_blog, only: :show

  # GET /blogs
  # GET /blogs.json
  def index
    @blogs = Blog.limit(8).order(updated_at: :DESC)
  end

  # GET /blog/1
  # GET /blog/1.json
  def show
    @post = Blog.find(params[:id])
    @RelatedPosts = Blog.all.where.not(id: params[:id]).limit(4)
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_blog
    @news = Blog.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def blog_params
    params.fetch(:news, {})
  end
end
