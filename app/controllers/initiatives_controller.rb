class InitiativesController < ApplicationController
  include Relatable

  def index
    @featured_tags = Tag.featured
  end

  def filter_index
    @featured_tags = Tag.featured
    @tag = Tag.find_by(slug: params[:tag])
    records = []

    entities.each do |klass|
      records << klass.where(published: true).joins(:tags).where(tags: {slug: @tag.slug})
    end

    @insights = records.flatten.take(page_quantity)
  end
end
