class InsightsController < ApplicationController
  def index
    # if filter_param is present
    records = []

    records << News.where(published: true)
    records << Blog.where(published: true)
    records << Event.where(published: true)
    records << Library.where(published: true)

    @records = records.flatten.sort { |a, b| b[:created_at] <=> a[:created_at] }
    @categories = Category.all

    # news = News.where(published: true).where("title LIKE ? OR summary LIKE ? OR content LIKE ?", "%#{term}%", "%#{term}%", "%#{term}%")
    # blogs = Blog.where(published: true).where("title LIKE ? OR summary LIKE ? OR content LIKE ?", "%#{term}%", "%#{term}%", "%#{term}%")
    # events = Event.where(published: true).where("title LIKE ? OR summary LIKE ? OR content LIKE ?", "%#{term}%", "%#{term}%", "%#{term}%")
    # libraries = Library.where(published: true).where("title LIKE ? OR summary LIKE ?", "%#{term}%", "%#{term}%")
  end

  def filter_param
    [:tag, :subcategory, :category].each do |permitted|
      return params.permit(permitted) if params[permitted].present?
    end
  end
end
