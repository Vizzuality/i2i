require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

Webpacker::Compiler.watched_paths << 'node_modules'

module I2i
  class Application < Rails::Application
    #config.active_job.queue_adapter = :sidekiq
    config.exceptions_app = self.routes
  end
end
