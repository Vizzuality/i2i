class CountryCarrier
  attr_reader :country, :publications
  
  def initialize(country)
    @country = country
  end
  
  def downloads
    @downloads = FindCountryDownloads.new(country).perform
    @downloads.first(4)
  end
  
  def show_downloads_modal?
    @downloads.count > 4
  end
  
  def modal_downloads
    @downloads_modal = FindCountryDownloads.new(country).perform
  
    @downloads_modal.map do |download|
      OpenStruct.new(
        id: download.id || "api-#{download.name}",
        title: download.name,
        url: download.url,
        html_class: download.html_class,
        zip: download.zip
      )
    end
  end

  def publications
    @publications ||= WrapCountriesPublications.new(country.id).perform
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
