class Updates::NewsController < ApplicationController
  before_action :set_news, only: :show

  # GET /news
  # GET /news.json
  def index
    @news = News.all
  end

  # GET /news/1
  # GET /news/1.json
  def show
  end

  # GET /news/new
  def new
    @news = News.new
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_news
      @news = News.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def news_params
      params.fetch(:news, {})
    end
end
