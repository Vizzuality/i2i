class InsightsController < ApplicationController
  include Relatable

  def index
    redirect_to insights_filter_index_url(:all), status: 302
  end

  def categories
    # Topics
    tag_term = params[:tag_term].split(',').map(&:strip) rescue nil
    topics_term = params[:topics].class == Array ? params[:topics].map(&:strip) : params[:topics].split(',').map(&:strip) rescue nil
    if tag_term
      tag_term.each do |tag|
        topics_term << tag
      end
    end

    # Locations
    locations_term = params[:locations].class == Array ? params[:locations].map(&:strip) : params[:locations].split(',').map(&:strip) rescue nil

    @categories = Category.all.order(:position)
    @category = Category.find_by(slug: params[:category])
    records = []

    totals = {}
    totals['all'] = 0;
    @categories.each do |category|
      size = 0
      size += Blog.published.where(category_id: category.id).size
      size += News.published.where(category_id: category.id).size
      size += Event.published.where(category_id: category.id).size
      size += Library.published.where(category_id: category.id).size

      totals[category.name] = size
      totals['all'] += size
    end

    if (topics_term || locations_term)
      records << News.search_by_filters(nil, nil, topics_term, locations_term)
      records << Blog.search_by_filters(nil, nil, topics_term, locations_term)
      records << Event.search_by_filters(nil, nil, topics_term, locations_term)
      records << Library.search_by_filters(nil, nil, topics_term, locations_term)

      insights = records.flatten.sort { |a, b| b[:date] <=> a[:date] }
    else
      entities.each { |klass| records << klass.where(published: true) }
      insights = records.flatten.sort { |a, b| b[:date] <=> a[:date] }
    end

    if @category.present?
      @total_insights = totals[@category.name]
      @insights = insights.select { |r| r.category_id == @category.id }.take(page_quantity)
    else
      @total_insights = totals['all']
      @insights = records.flatten.sort { |a, b| b[:date] <=> a[:date] }.take(page_quantity)
    end

    if params[:offset].present?
      @morePaginationAvailable = (@total_insights - (params[:offset].to_i * ENV['OFFSET_SIZE'].to_i)) > 0
    else
      @morePaginationAvailable = (@total_insights - (1 * ENV['OFFSET_SIZE'].to_i)) > 0
    end

    @offset = params[:offset] ? params[:offset].to_i + 1 : 2;

    @topics = Tag.all.order(:slug)
    @countries = Country.ordered_by_name

    rescue
      category = Category.find_by(slug: 'blog') || Category.first
      redirect_to insights_filter_index_path(category) rescue nil
  end
end
