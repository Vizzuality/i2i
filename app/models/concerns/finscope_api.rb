module FinscopeApi
  def self.get_countries
    response = JSON.parse(HTTP.get("#{ENV['API_URL']}/country?lastyear=true").body.to_s)

    response.map do |country|
      {
        iso: country['iso'],
        name: country['name'],
        latest_year: country['year'][0]['year']
      }
    end
  end

  def self.get_regions
    response = JSON.parse(HTTP.get("#{ENV['API_URL']}/region?lastyear=true").body.to_s)

    response.map do |region|
      {
        iso: region['iso'],
        name: region['name'],
        latest_year: region['year'][0]['year']
      }
    end
  end
end
