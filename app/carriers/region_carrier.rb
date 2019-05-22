class RegionCarrier
  attr_reader :region, :publications
  
  delegate :iso, to: :region
  
  def initialize(region)
    @region = region
  end
  
  def publications
    @publications ||= FindRegionPublications.new(region.id).perform
    @publications.first(4)
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
