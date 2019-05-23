class Wrappers::BlogWrapper < Wrappers::BasePublicationWrapper
  delegate :issuu_link, to: :publication
  
  def view_link_visible?
    # issuu_link.present?
    true
  end
  
  def view_link
    # issuu_link
    title_link
  end

  def title_has_link?
    false
  end

  def title_link
    url_helpers.insights_show_path(category: category.slug, slug: slug, entity: 'blog')
  end

  def url
    url_helpers.insights_show_url(
      category.slug,
      slug,
      host: ActionMailer::Base.default_url_options[:host],
      port: ActionMailer::Base.default_url_options[:port],
      entity: 'blog'
    )
  end
end
