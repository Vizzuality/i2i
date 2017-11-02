require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module I2i
  class Application < Rails::Application
    #config.active_job.queue_adapter = :sidekiq
    config.exceptions_app = self.routes

    # Cors
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
                 headers: :any,
                 methods: %i(get post put patch delete options head)
      end
    end
  end
end
