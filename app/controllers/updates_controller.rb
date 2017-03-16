class UpdatesController < ApplicationController

  def index
    @posts = Blog.limit(4).order(date: :DESC)
    @news = News.limit(6).order(date: :DESC)
    @events = Event.limit(4).order(date: :DESC)
  end
end
