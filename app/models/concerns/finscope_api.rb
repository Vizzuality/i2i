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
end