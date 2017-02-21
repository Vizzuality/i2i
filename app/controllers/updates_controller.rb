class UpdatesController < ApplicationController

  def index
    @blogs = Blog.all
    @news = News.all
    @libraries = Library.all
    @events = Event.all
  end
end
