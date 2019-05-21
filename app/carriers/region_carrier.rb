class RegionCarrier
  attr_reader :region, :publications
  
  delegate :iso, to: :region
  
  def initialize(region)
    @region = region
  end
  
  def publications
    @publications ||= FindRegionPublications.new(region.id).perform
  end
  
  def downloads
    region.links.first(4)
  end
  
  def show_downloads_modal?
    region.links.count > 4
  end
  
  def modal_downloads
    region.links.map { |link| OpenStruct.new(id: link.id, title: link.name, url: link.url ) }
  end
  
  def more_publications_visible?
    downloadable_publications.count > 4
  end
  
  def downloadable_publications
    libraries = region.libraries.includes(:document).merge(Library.published.featured).all.select do |library|
      library.document&.file.present? || library.url_resource.present?
    end
    
    libraries.map { |library| OpenStruct.new(id: library.id, title: library.title ) }
  end
end
