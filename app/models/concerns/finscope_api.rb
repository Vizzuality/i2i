module FinscopeApi
  def self.get_countries
    Country.all.map do |country|
      latest_country = Country4Year.
        select(:year).
        where(country_id: country.id).
        desc(:year).first

      {
        iso: country.iso,
        name: country.name,
        latest_year: latest_country.year
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
