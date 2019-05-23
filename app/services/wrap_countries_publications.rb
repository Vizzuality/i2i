class WrapCountriesPublications
  PUBLICATION_CATEGORY_SLUG = 'publications'
  
  attr_reader :country
  
  def initialize(country_id)
    @country = Country.find(country_id)
  end
  
  def perform
    category = Category.find_by(slug: PUBLICATION_CATEGORY_SLUG)
    
    country_blogs = country.blogs.where(category: category).merge(Blog.published).map do |blog|
      Wrappers::BlogWrapper.new(blog)
    end

    country_events = country.events.where(category: category).merge(Event.published).map do |event|
      Wrappers::EventWrapper.new(event)
    end

    country_libraries = country.libraries.includes(:document).where(category: category).merge(Library.published).all.select do |library|
      library.document&.file.present? || library.url_resource.present? || library.issuu_link.present? || library.video_url.present?
    end.map do |library|
      Wrappers::LibraryWrapper.new(library)
    end

    country_news = country.news.where(category: category).merge(News.published).map do |news|
      Wrappers::NewsWrapper.new(news)
    end

    [*country_blogs, *country_events, *country_libraries, *country_news]
  end
end
