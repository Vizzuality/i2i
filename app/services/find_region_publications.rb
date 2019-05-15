class FindRegionPublications
  attr_reader :region
  
  def initialize(region_id)
    @region = Region.find(region_id)
  end
  
  def perform
    region_blogs = region.blogs.merge(Blog.published.featured).map do |blog|
      Wrappers::BlogWrapper.new(blog)
    end
    
    region_events = region.events.merge(Event.published.featured).map do |event|
      Wrappers::EventWrapper.new(event)
    end
    
    region_libraries = region.libraries.includes(:document).merge(Library.published.featured).map do |library|
      Wrappers::LibraryWrapper.new(library)
    end
    
    region_news = region.news.merge(News.published.featured).map do |news|
      Wrappers::NewsWrapper.new(news)
    end

    [*region_blogs, *region_events, *region_libraries, *region_news]
  end
end
