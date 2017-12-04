class SearchesController < ApplicationController
  def index
    term = params[:term]

    if !term || term.empty?

      records = []

      entities.each do |klass|
        records << klass.published.featured
      end

      @tweets = TwitterApi.get_tweets
      @insights = records.flatten.sort do |a, b|
        [[a[:position] ? 0 : 1, a[:position]], b[:updated_at]] <=> [[b[:position] ? 0 : 1, b[:position]], a[:updated_at]]
      end[0..5]
    else

      news = News.search_fields(term)
      blogs = Blog.search_fields(term)
      events = Event.search_fields(term)
      libraries = Library.search_fields(term)

      @categories = Category.all
      @records = (news + blogs + events + libraries)
    end
  end
end
