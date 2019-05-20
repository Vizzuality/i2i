class CountryCarrier
  attr_reader :country, :publications
  
  def initialize(country)
    @country = country
  end
  
  def publications
    @publications ||= WrapCountriesPublications.new(country.id).perform
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
    downloadable_publications.any?
  end
  
  def downloadable_publications
    libraries = country.libraries.includes(:document).merge(Library.published.featured).all.select do |library|
      library.document&.file.present? || library.url_resource.present?
    end
    
    libraries.map { |library| OpenStruct.new(id: library.id, title: library.title ) }
  end
end
