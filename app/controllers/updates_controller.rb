class UpdatesController < ApplicationController

  def index
    @blogs = Blog.all
    @news = News.order(:created_at)
    @libraries = Library.all
    @events = Event.all
  end
end
