class FindRegionDownloads
  attr_reader :region
  
  delegate :iso, to: :region
  
  def initialize(region)
    @region = region
    
    region.links.first(4)
  end
  
  def perform
    region_links_downloads | region_api_downloads
  end
  
  private
  
  def region_links_downloads
    region.links.map do |link|
      OpenStruct.new(
        id: link.id,
        name: link.name,
        url: link.url,
        html_class: '',
        zip: false
      )
    end
  end
  
  def region_api_downloads
    result = []
    
    if region_all_years.dig('years').present?
      region_all_years['years'].map do |year_data|
        if year_data['dataUrl'].present?
          result << OpenStruct.new(
            name: "#{year_data['year']} (ZIP)",
            url: year_data['dataUrl'],
            html_class: "api-#{year_data['year']}",
            zip: true
          )
        end
    
        result << OpenStruct.new(
          name: year_data['year'].to_s,
          url: "#{ENV['API_URL']}/region/#{region.iso}/#{year_data['year']}/download",
          html_class: "api-#{year_data['year']}",
          zip: false
        )
      end
    end
    
    result
  end

  def region_all_years
    response = JSON.parse(HTTP.get("#{ENV['API_URL']}/region/#{region.iso}").body.to_s)
    
    return {} if response.is_a?(Hash) && response['errors'].present?
    
    response.first
  end
end
