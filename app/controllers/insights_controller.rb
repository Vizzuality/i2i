class InsightsController < ApplicationController
  include Relatable

  def index
    @categories = Category.all
    @category = Category.find_by(slug: params[:category])
    records = []

    totals = {}
    @categories.each do |category|
      size = 0
      size += Blog.published.where(category_id: category.id).size
      size += News.published.where(category_id: category.id).size
      size += Event.published.where(category_id: category.id).size
      size += Library.published.where(category_id: category.id).size

      totals[category.name] = size
    end

    @total_insights = totals[@category.name]

    if params[:category].present?
      if @category.present?
        entities.each { |klass| records << klass.where(published: true) }
        insights = records.flatten.sort { |a, b| b[:date] <=> a[:date] }
        @insights = insights.select { |r| r.category_id == @category.id }.take(page_quantity)
      else
        @insights = []
      end
    else
      redirect_to insights_filter_index_path(Category.first) rescue nil
    end


    if params[:offset].present?
      @morePaginationAvailable = (@total_insights - (params[:offset].to_i * ENV['OFFSET_SIZE'].to_i)) >= 0
    else
      @morePaginationAvailable = (@total_insights - (1 * ENV['OFFSET_SIZE'].to_i)) >= 0
    end

    @offset = params[:offset] ? params[:offset].to_i + 1 : 2;
  end
end
