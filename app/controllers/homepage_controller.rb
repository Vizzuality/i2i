class HomepageController < ApplicationController
  include TwitterApi

  def index
    records = []

    entities.each do |klass|
      records << klass.published.featured
    end

    @tweets = TwitterApi.get_tweets
    @insights = records.flatten.sort { |a, b| b[:updated_at] <=> a[:updated_at] }[0..5]
  end
end
