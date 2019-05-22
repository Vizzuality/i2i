class FindCountryDownloads
  attr_reader :country
  
  delegate :iso, to: :country
  
  def initialize(country)
    @country = country
    
    country.links.first(4)
  end
  
  def perform
    country_links_downloads | country_api_downloads
  end
  
  private

  def country_links_downloads
    country.links.map do |link|
      OpenStruct.new(
        id: link.id,
        name: link.name,
        url: link.url,
        html_class: '',
        zip: false
      )
    end
  end
  
  def country_api_downloads
    result = []
    
    if country_all_years.dig('years').present?
      country_all_years['years'].map do |year_data|
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
          url: "#{ENV['API_URL']}/country/#{country.iso}/#{year_data['year']}/download",
          html_class: "api-#{year_data['year']}",
          zip: false
        )
      end
    end
    
    result
  end
  
  def country_all_years
    response = JSON.parse(HTTP.get("#{ENV['API_URL']}/country/#{country.iso}").body.to_s)
    
    return {} if response.is_a?(Hash) && response['errors'].present?
    
    response.first
  end
end
