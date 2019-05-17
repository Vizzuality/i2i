class Wrappers::BasePublicationWrapper
  attr_reader :publication
  
  delegate :url_helpers, to: 'Rails.application.routes'
  delegate :title, :category, :slug, to: :publication
  
  def initialize(publication)
    @publication = publication
  end

  def download_link_visible?
    false
  end

  def download_link
    nil
  end

  def title_has_link?
    true
  end

  def title_link
    nil
  end
  
  def view_link_visible?
    false
  end

  def view_link
    nil
  end

  def video_link_visible?
    false
  end

  def video_link
    nil
  end
end

