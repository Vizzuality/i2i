class InsightsController < ApplicationController
  include Relatable

  def index
    @categories = Category.all
    @category = Category.find_by(slug: params[:category])
    quantity = params[:qty].to_i || 15 rescue 15
    records = []

    if params[:category].present?
      if @category.present?
        entities.each { |klass| records << klass.where(published: true) }
        insights = records.flatten.sort { |a, b| b[:date] <=> a[:date] }
        @insights = insights.select { |r| r.category_id == @category.id }.take(quantity)
      else
        @insights = []
      end
    else
      redirect_to insights_filter_index_path(Category.first) rescue nil
    end
  end
end
