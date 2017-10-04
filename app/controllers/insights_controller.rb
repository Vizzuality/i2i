class InsightsController < ApplicationController
  def index
    @categories = Category.all
    @category = Category.find_by(slug: params[:category])
    records = []

    records << News.where(published: true)
    records << Blog.where(published: true)
    records << Event.where(published: true)
    records << Library.where(published: true)

    @insights = records.flatten.sort { |a, b| b[:created_at] <=> a[:created_at] }

    if params[:category].present?
      if @category.present?
        @insights = @insights.select { |r| r.category_id == @category.id } if @category.present?
      else
        @insights = []
      end
    end
  end

  def show
    @insight = params[:entity].capitalize.constantize.published.friendly.find(params[:slug])
  end
end
