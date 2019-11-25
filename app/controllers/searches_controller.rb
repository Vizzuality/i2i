class SearchesController < ApplicationController
  def index
    # Term
    term = params[:term].class == Array ? params[:term].map(&:strip) : params[:term].split(',').map(&:strip) rescue nil

    # Topics
    tag_term = params[:tag_term].split(',').map(&:strip) rescue nil
    topics_term = params[:topics].class == Array ? params[:topics].map(&:strip) : params[:topics].split(',').map(&:strip) rescue nil
    if tag_term
      tag_term.each do |tag|
        topics_term << tag
      end
    end

    # Categories
    categories = Category.where(slug: params[:types])
    categories_term = categories.map { |cat| cat.id }

    # Locations
    locations_term = params[:locations].class == Array ? params[:locations].map(&:strip) : params[:locations].split(',').map(&:strip) rescue nil

    # Search result
    records = []

    if !term && !topics_term && !locations_term && categories_term.size === 0
      entities.each do |klass|
        records << klass.published.featured
      end

      @insights = records.flatten.sort do |a, b|
        [[a[:position] ? 0 : 1, a[:position]], b[:updated_at]] <=> [[b[:position] ? 0 : 1, b[:position]], a[:updated_at]]
      end[0..5]
      @tweets = TwitterApi.get_tweets
    else
      records << News.search_by_filters(term, categories_term, topics_term, locations_term)
      records << Blog.search_by_filters(term, categories_term, topics_term, locations_term)
      records << Event.search_by_filters(term, categories_term, topics_term, locations_term)
      records << Library.search_by_filters(term, categories_term, topics_term, locations_term)

      @records = records.flatten.uniq.sort_by { |r| -r.date.to_i }
    end

    # Variables for filters
    @categories = Category.all
    @topics = Tag.all.order(:slug)
    @countries = Country.ordered_by_name
    @term = term

    # GON
    gon.term = term
    gon.selected_tags = tag_term
    gon.tags = @topics
  end
end
