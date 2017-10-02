class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def entities
    [News, Event, Library, Blog]

  def meta(records)
    {
      current_page: records.current_page,
      total_pages: records.total_pages,
      total_count: records.total_count
    }
  end
end
