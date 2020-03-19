namespace :i2i_api_import do
  desc 'Import countries from API'
  task import_countries: :environment do
    I2IAPI::Country.all.each do |i2i_api_country|
      existing_country = ::Country.find_by(iso: i2i_api_country.iso)
      if existing_country
        existing_country.update_attributes(map_url: i2i_api_country.map_url)
      else
        ::Country.create(
          iso: i2i_api_country.iso,
          name: i2i_api_country.name,
          map_url: i2i_api_country.map_url
        )
      end
    end
  end

  desc 'Import regions from API'
  task import_regions: :environment do
    I2IAPI::Region.all.each do |i2i_api_region|
      existing_region = ::Region.find_by(iso: i2i_api_region.iso)
      if existing_region
        existing_region.update_attributes(map_url: i2i_api_region.map_url)
      else
        ::Region.create(
          iso: i2i_api_region.iso,
          name: i2i_api_region.name,
          map_url: i2i_api_region.map_url
        )
      end
    end
  end

  module I2IAPI
    class ExternalDatabase < ActiveRecord::Base
      self.establish_connection(
        adapter: 'postgresql',
        encoding: 'unicode',
        database: ENV.fetch('I2I_API_DATABASE_NAME', 'i2i_api'),
        username: ENV.fetch('I2I_API_DATABASE_USERNAME', 'postgres'),
        host: ENV.fetch('I2I_API_DATABASE_PORT', 'localhost'),
        port: ENV.fetch('I2I_API_DATABASE_PORT', 5432),
        password: ENV.fetch('I2I_API_DATABASE_PASSWORD', '')
      )
    end

    class Country < ExternalDatabase
      self.table_name = 'countries'
    end

    class Region < ExternalDatabase
      self.table_name = 'regions'
    end
  end
end
