class WrapCountriesPublications
  attr_reader :country
  
  def initialize(country_id)
    @country = Country.find(country_id)
  end
  
  def perform
    country_blogs = country.blogs.merge(Blog.published.featured).map do |blog|
      Wrappers::BlogWrapper.new(blog)
    end

    country_events = country.events.merge(Event.published.featured).map do |event|
      Wrappers::EventWrapper.new(event)
    end

    country_libraries = country.libraries.includes(:document).merge(Library.published.featured).map do |library|
      Wrappers::LibraryWrapper.new(library)
    end

    country_news = country.news.merge(News.published.featured).map do |news|
      Wrappers::NewsWrapper.new(news)
    end
    
    [*country_blogs, *country_events, *country_libraries, *country_news]
  end
end
