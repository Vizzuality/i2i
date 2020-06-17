module FinscopeApi
  def self.new_get_countries
    @countries ||= Country.all.map do |country|
      latest_country = Country4Year.
        select(:year).
        where(country_id: country.id).
        order(year: :desc).first

      next unless latest_country

      {
        iso: country.iso,
        name: country.name,
        latest_year: latest_country.year
      }
    end.compact
  end

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
