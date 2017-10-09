module TwitterApi
  def self.get_tweets
    client.user_timeline('i2ifacility')
  end

  def self.client
    Twitter::REST::Client.new do |config|
      config.consumer_key    = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret = ENV['TWITTER_CONSUMER_SECRET']
    end
  end
end