class UpdatesController < ApplicationController

  def index
    @posts = Blog.published.limit(4).order(date: :DESC)
    @news = News.published.limit(6).order(date: :DESC)
    @events = Event.published.limit(4).order(date: :DESC)
  end
end
