class SearchesController < ApplicationController
  def index
    term = params[:term]

    news = News.where(published: true)
               .joins(:category)
               .joins(:tags)
               .where("lower(title) LIKE ? OR lower(summary) LIKE ? OR lower(content) LIKE ? OR lower(categories.name) like ? OR lower(tags.name) ?",
                      "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%")
    blogs = Blog.where(published: true)
                .joins(:category)
                .joins(:tags)
                .where("lower(title) LIKE ? OR lower(summary) LIKE ? OR lower(content) LIKE ? OR lower(categories.name) like ? OR lower(tags.name) ?",
                       "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%")
    events = Event.where(published: true)
                  .joins(:category)
                  .joins(:tags)
                  .where("lower(title) LIKE ? OR lower(summary) LIKE ? OR lower(content) LIKE ? OR lower(categories.name) like ? OR lower(tags.name) ?",
                         "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%")
    libraries = Library.where(published: true)
                       .joins(:category)
                       .joins(:tags)
                       .where("lower(title) LIKE ? OR lower(summary) LIKE ? OR lower(categories.name) like ? OR lower(tags.name) ?",
                              "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%")

    @categories = Category.all
    @records = (news + blogs + events + libraries)
  end
end
