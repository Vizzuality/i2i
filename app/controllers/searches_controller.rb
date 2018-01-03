class SearchesController < ApplicationController
  def index
    term = params[:term].split(',').map(&:strip) rescue nil

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
      search_result = []

      term.each do |search_term|
        search_result << News.search_fields(search_term)
        search_result << Blog.search_fields(search_term)
        search_result << Event.search_fields(search_term)
        search_result << Library.search_fields(search_term)
      end

      @tags = Tag.all
      @categories = Category.all
      @records = (search_result.flatten)
    end
  end
end
