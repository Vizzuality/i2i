class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def entities
    [News, Event, Library, Blog]
  end
end
