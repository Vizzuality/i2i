class Wrappers::LibraryWrapper < Wrappers::BasePublicationWrapper
  delegate :url_resource, :document, :video_url, :issuu_link, to: :publication

  def download_link_visible?
    document&.file.present? || url_resource.present?
  end

  def download_link
    document&.file.present? ? document.file.url : url_resource
  end

  def view_link_visible?
    issuu_link.present?
  end

  def view_link
    issuu_link
  end
  
  def video_link_visible?
    video_url.present?
  end

  def video_link
    video_url
  end
  
  def title_has_link?
    false
  end

  def url
    if document&.file.present?
      URI.join(absolute_root_url, document.file.url).to_s
    elsif url_resource.present?
      url_resource
    elsif view_link_visible?
      view_link
    else
      video_link
    end
  end
  
  private
  
  def absolute_root_url
    url_helpers.root_url(
      host: ActionMailer::Base.default_url_options[:host],
      port: ActionMailer::Base.default_url_options[:port]
    )
  end
end
