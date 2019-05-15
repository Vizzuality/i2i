class RegionCarrier
  attr_reader :region, :publications
  
  def initialize(region)
    @region = region
  end
  
  def publications
    @publications ||= FindRegionPublications.new(region.id).perform
  end
  
  def downloads
    []
  end
  
  def show_downloads_modal?
    true
  end
  
  def modal_downloads
    [OpenStruct.new(title: 'testing file name', id: 1),
     OpenStruct.new(title: 'testing file name 2', id: 2),
     OpenStruct.new(title: 'testing file name 3', id: 3)]
  end
  
  def more_publications_visible?
    downloadable_publications.any?
  end
  
  def downloadable_publications
    libraries = region.libraries.includes(:document).merge(Library.published.featured).all.select do |library|
      library.document&.file.present? || library.url_resource.present?
    end
    
    libraries.map { |library| OpenStruct.new(id: library.id, title: library.title ) }
  end
end
