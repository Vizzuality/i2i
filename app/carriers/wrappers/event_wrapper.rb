class Wrappers::EventWrapper < Wrappers::BasePublicationWrapper
  delegate :url, to: :publication
  
  def view_link_visible?
    url.present?
  end
  
  def view_link
    url
  end
  
  def title_link
    url_helpers.insights_show_path(category: category.slug, slug: slug, entity: 'event')
  end
end
