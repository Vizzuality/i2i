class InsightsController < ApplicationController
  def index
    @categories = Category.all
    @category = Category.find_by(slug: params[:category])
    subcategory = Subcategory.find_by(slug: params[:subcategory])
    records = []

    entities.each do |klass|
      records << klass.where(published: true)
    end

    @insights = records.flatten.sort { |a, b| b[:created_at] <=> a[:created_at] }

    if params[:category].present?
      if @category.present?
        if params[:subcategory].present?
          subcategory = Subcategory.find_by(slug: params[:subcategory])

          @insights = subcategory.present? ? @insights.select { |r| r.subcategory_id == subcategory.id } : []
        else
          @insights = @insights.select { |r| r.category_id == @category.id }
        end
      else
        @insights = []
      end
    end
  end

  def show
    @insight = params[:entity].capitalize.constantize.published.friendly.find(params[:slug]) rescue nil
  end
end
