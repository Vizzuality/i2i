class Wrappers::EventWrapper < Wrappers::BasePublicationWrapper
  delegate :url, to: :publication
  
  def view_link_visible?
    # url.present?
    true
  end
  
  def view_link
    # url
    title_link
  end

  def title_has_link?
    false
  end
  
  def title_link
    url_helpers.insights_show_path(category: category.slug, slug: slug, entity: 'event')
  end
  
  def url
    url_helpers.insights_show_url(
      category.slug,
      slug,
      host: ActionMailer::Base.default_url_options[:host],
      port: ActionMailer::Base.default_url_options[:port],
      entity: 'event'
    )
  end
end
