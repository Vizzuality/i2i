class UpdatesController < ApplicationController

  def index
    @posts = Blog.limit(4).order(created_at: :DESC)
    @news = News.limit(6).order(created_at: :DESC)
    @events = Event.limit(4).order(created_at: :DESC)
  end
end
