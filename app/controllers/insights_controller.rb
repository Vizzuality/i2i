class InsightsController < ApplicationController
  def index
    @categories = Category.all
    @category = Category.find_by(slug: params[:category])
    records = []

    entities.each do |klass|
      records << klass.where(published: true)
    end

    @insights = records.flatten.sort { |a, b| b[:date] <=> a[:date] }

    if params[:category].present?
      if @category.present?
        @insights = @insights.select { |r| r.category_id == @category.id }
      else
        @insights = []
      end
    else
      redirect_to insights_filter_index_path(Category.first)
    end
  end

  def show
    @insight = params[:entity].capitalize.constantize.published.friendly.find(params[:slug]) rescue nil
  end
end
