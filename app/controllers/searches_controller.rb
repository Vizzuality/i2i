class SearchesController < ApplicationController
  def index
    term = params[:term].class == Array ? params[:term].map(&:strip) : params[:term].split(',').map(&:strip) rescue nil
    tag_term = params[:tag_term].split(',').map(&:strip) rescue nil
    types_term = params[:types].class == Array ? params[:types].map(&:strip) : params[:types].split(',').map(&:strip) rescue nil
    topics_term = params[:topics].class == Array ? params[:topics].map(&:strip) : params[:topics].split(',').map(&:strip) rescue nil
    locations_term = params[:locations].class == Array ? params[:locations].map(&:strip) : params[:locations].split(',').map(&:strip) rescue nil

    categories = Category.where(slug: params[:types])

    term = !term || term.size === 0 ? nil : term

    if locations_term || topics_term
      tag_term = tag_term || []
    end

    if !term && !tag_term
      records = []

      if categories && categories.size > 0
        entities.each do |klass|
          categories.each do |category|
            records << klass.published.featured.where(category_id: category.id)
          end
        end

        @records = records.flatten.sort do |a, b|
          [[a[:position] ? 0 : 1, a[:position]], b[:updated_at]] <=> [[b[:position] ? 0 : 1, b[:position]], a[:updated_at]]
        end
      else
        entities.each do |klass|
          records << klass.published.featured
        end

        @insights = records.flatten.sort do |a, b|
          [[a[:position] ? 0 : 1, a[:position]], b[:updated_at]] <=> [[b[:position] ? 0 : 1, b[:position]], a[:updated_at]]
        end[0..5]
      end

      @tweets = TwitterApi.get_tweets
    else
      term_result = []
      tag_result = []

      if topics_term
        topics_term.each do |topic_term|
          tag_term << topic_term
        end
      end

      if locations_term
        locations_term.each do |location_term|
          tag_term << location_term
        end
      end

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

      if categories && categories.size > 0
        @records = []
        categories.each do |category|
          @records << search_result.select { |r| r.category_id == category.id }
        end
        @records = @records.flatten.uniq
      else
        @records = (search_result.flatten.uniq)
      end
    end

    @categories = Category.all
    @topics = Tag.all.order(:slug)
    @countries = Country.ordered_by_name

    gon.term = term
    gon.selected_tags = tag_term
    gon.tags = @topics
  end
end
