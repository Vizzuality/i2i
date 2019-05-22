class FindRegionPublications
  PUBLICATION_CATEGORY_SLUG = 'publications'
  
  attr_reader :region
  
  def initialize(region_id)
    @region = Region.find(region_id)
  end
  
  def perform
    category = Category.find_by(slug: PUBLICATION_CATEGORY_SLUG)
  
    region_blogs = region.blogs.where(category: category).merge(Blog.published).map do |blog|
      Wrappers::BlogWrapper.new(blog)
    end

    region_events = region.events.where(category: category).merge(Event.published).map do |event|
      Wrappers::EventWrapper.new(event)
    end
    
    region_libraries = region.libraries.includes(:document).where(category: category).merge(Library.published).all.select do |library|
      library.document&.file.present? || library.url_resource.present? || library.issuu_link.present? || library.video_url.present?
    end.map do |library|
      Wrappers::LibraryWrapper.new(library)
    end
    
    region_news = region.news.where(category: category).merge(News.published).map do |news|
      Wrappers::NewsWrapper.new(news)
    end

    [*region_blogs, *region_events, *region_libraries, *region_news]
  end
end
