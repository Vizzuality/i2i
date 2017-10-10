class SearchesController < ApplicationController
  def index
    term = params[:term]

    news = News.where(published: true).where("title LIKE ? OR summary LIKE ? OR content LIKE ?", "%#{term}%", "%#{term}%", "%#{term}%")
    blogs = Blog.where(published: true).where("title LIKE ? OR summary LIKE ? OR content LIKE ?", "%#{term}%", "%#{term}%", "%#{term}%")
    events = Event.where(published: true).where("title LIKE ? OR summary LIKE ? OR content LIKE ?", "%#{term}%", "%#{term}%", "%#{term}%")
    libraries = Library.where(published: true).where("title LIKE ? OR summary LIKE ?", "%#{term}%", "%#{term}%")

    @categories = Category.all
    @records = (news + blogs + events + libraries)
  end
end
