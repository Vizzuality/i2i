class InitiativesController < ApplicationController
  def index
    # return fixed tags for index page
  end

  def filter_index
    @tag = Tag.find_by(slug: params[:tag])
    records = []

    entities.each do |klass|
      records << klass.where(published: true).joins(:tags).where(tags: {slug: @tag.slug})
    end

    @insights = records.flatten
  end
end
