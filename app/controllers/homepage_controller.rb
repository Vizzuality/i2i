class HomepageController < ApplicationController
  def index
    records = []

    entities.each do |klass|
      records << klass.published.featured
    end

    @insights = records.flatten.sort { |a, b| b[:date] <=> a[:date] }[0..5]
  end
end
