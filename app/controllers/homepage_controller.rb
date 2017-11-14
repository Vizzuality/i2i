class HomepageController < ApplicationController
  include TwitterApi

  def index
    records = []

    entities.each do |klass|
      records << klass.published.featured
    end

    @tweets = TwitterApi.get_tweets
    @insights = records.flatten.sort do |a, b|
      [[a[:position] ? 0 : 1, a[:position]], b[:updated_at]] <=> [[b[:position] ? 0 : 1, b[:position]], a[:updated_at]]
    end[0..5]
  end
end
