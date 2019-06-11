class RegionCarrier
  attr_reader :region, :publications
  
  delegate :iso, to: :region
  
  def initialize(region)
    @region = region
  end
  
  def downloads
    @downloads = FindRegionDownloads.new(region).perform
    @downloads.first(4)
  end
  
  def show_downloads_modal?
    @downloads.count > 4
  end
  
  def modal_downloads
    @downloads_modal = FindRegionDownloads.new(region).perform
    @downloads_modal.map do |download|
      OpenStruct.new(
        id: download.id || download.html_class,
        title: download.name,
        url: download.url,
        html_class: download.html_class,
        zip: download.zip
      )
    end
  end

  def publications
    @publications ||= FindRegionPublications.new(region.id).perform
    @publications.first(4)
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
