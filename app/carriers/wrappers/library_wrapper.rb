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
end
