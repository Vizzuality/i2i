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
      redirect_to insights_filter_index_path(Category.first) rescue nil
    end
  end

  def show
    @insight = params[:entity].capitalize.constantize.published.friendly.find(params[:slug]) rescue nil
    # debugger
    @related = related(@insight.tags)
  end

  def related(tags)
    score = {}

    Blog.joins(:tags).where(tags: {id: tags.pluck(:id)})
    Events.joins(:tags).where(tags: {id: tags.pluck(:id)})
    News.joins(:tags).where(tags: {id: tags.pluck(:id)})
    Libraries.joins(:tags).where(tags: {id: tags.pluck(:id)})
  end
end
