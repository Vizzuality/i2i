class SearchesController < ApplicationController
  def index
    term = params[:term]

    news = News.search_fields(term)
    blogs = Blog.search_fields(term)
    events = Event.search_fields(term)
    libraries = Library.search_fields(term)

    @categories = Category.all
    @records = (news + blogs + events + libraries)
    debugger
  end
end
