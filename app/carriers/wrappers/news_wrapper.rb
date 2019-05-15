class Wrappers::NewsWrapper < Wrappers::BasePublicationWrapper
  delegate :issuu_link, to: :publication
  
  def view_link_visible?
    issuu_link.present?
  end
  
  def view_link
    issuu_link
  end
  
  def title_link
    url_helpers.insights_show_path(category: category.slug, slug: slug, entity: 'news')
  end
end
