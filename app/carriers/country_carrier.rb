class CountryCarrier
  attr_reader :country, :publications
  
  def initialize(country)
    @country = country
  end
  
  def publications
    @publications ||= WrapCountriesPublications.new(country.id).perform
    @publications.first(4)
  end
  
  def downloads
    country.links.first(4)
  end
  
  def show_downloads_modal?
    country.links.count > 4
  end
  
  def modal_downloads
    country.links.map { |link| OpenStruct.new(id: link.id, title: link.name, url: link.url ) }
  end
  
  def more_publications_visible?
    @publications.count > 4
  end
  
  def downloadable_publications
    @publications.map do |publication|
      OpenStruct.new(
        id: "#{publication.record_type}-#{publication.id}-#{publication.slug}",
        title: publication.title,
        url: publication.url
      )
    end
  end
end
