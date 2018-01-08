class SearchesController < ApplicationController
  def index
    term = params[:term].split(',').map(&:strip) rescue nil
    tag_term = params[:tag_term].split(',').map(&:strip) rescue nil

    if !term && !tag_term
      records = []

      entities.each do |klass|
        records << klass.published.featured
      end

      @tweets = TwitterApi.get_tweets
      @insights = records.flatten.sort do |a, b|
        [[a[:position] ? 0 : 1, a[:position]], b[:updated_at]] <=> [[b[:position] ? 0 : 1, b[:position]], a[:updated_at]]
      end[0..5]
    else
      term_result = []
      tag_result = []

      if term
        term.each do |search_term|
          term_result << News.search_fields(search_term)
          term_result << Blog.search_fields(search_term)
          term_result << Event.search_fields(search_term)
          term_result << Library.search_fields(search_term)
        end

        @term = term
        term_result.flatten!
      end

      if tag_term
        tag_term.each do |search_term|
          tag_result << News.search_tags(search_term)
          tag_result << Blog.search_tags(search_term)
          tag_result << Event.search_tags(search_term)
          tag_result << Library.search_tags(search_term)
        end

        @tag_term = TagsHelper.slugsToNames tag_term
        tag_result.flatten!
      end

      search_result =
      if term && tag_term
        term_result & tag_result
      elsif term && !tag_term
        term_result
      elsif !term && tag_term
        tag_result
      end

      @categories = Category.all
      @records = (search_result.flatten.uniq)
    end

    gon.term = term
    gon.selected_tags = tag_term
    gon.tags = Tag.all.order(:slug)
  end
end
