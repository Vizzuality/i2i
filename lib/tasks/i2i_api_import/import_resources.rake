namespace :i2i_api_import do
  models = %w[Country Region Country4Year Region4Year
              Answer OriginalAnswer AnswerRegion OriginalAnswerRegion]

  desc 'Import all models from API'
  task import_all: :environment do
    models.each do |model|
      Object.const_get("I2IAPI::#{model}").import_external
    end
  end

  models.each do |model|
    desc "Import #{model} from API"
    task :"import_#{model.underscore.pluralize}" => :environment do
      Object.const_get("I2IAPI::#{model}").import_external
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

      def self.import_external
        I2IAPI::Country.all.each do |i2i_api_country|
          ::Country.find_or_initialize_by(
            iso: i2i_api_country.iso,
            name: i2i_api_country.name,
            map_url: i2i_api_country.map_url
          ).save
        end
      end
    end

    class Region < ExternalDatabase
      self.table_name = 'countries'

      def self.import_external
        I2IAPI::Region.all.each do |i2i_api_region|
          ::Region.find_or_initialize_by(
            iso: i2i_api_region.iso,
              name: i2i_api_region.name,
              map_url: i2i_api_region.map_url
          ).save
        end
      end
    end

    class Country4Year < ExternalDatabase
      self.table_name = 'country4years'

      def self.import_external
        i2i_api_data = I2IAPI::Country4Year.all.map do |country_4_year|
          data = country_4_year.attributes.except('id').transform_keys { |key| key.to_s.underscore }
          country_api = I2IAPI::Country.find(data['country_id'])

          next unless existing_country = ::Country.find_by(iso: country_api.iso)

          data['country_id'] = existing_country.id
          data
        end.compact

        ::Country4Year.import(i2i_api_data)
      end
    end

    class Region4Year < ExternalDatabase
      self.table_name = 'region4years'

      def self.import_external
        i2i_api_data = I2IAPI::Region4Year.all.map do |region_4_year|
          data = region_4_year.attributes.except('id').transform_keys { |key| key.to_s.underscore }
          region_api = I2IAPI::Region.find(data['region_id'])

          next unless existing_region = ::Region.find_by(iso: region_api.iso)

          data['region_id'] = existing_region.id
          data
        end.compact

        ::Region4Year.import(i2i_api_data)
      end
    end

    class Answer < ExternalDatabase
      self.table_name = 'answers'

      def self.import_external
        attributes = I2IAPI::Answer.import_external_select_columns
        I2IAPI::Answer.select(*attributes).find_in_batches(batch_size: 10_000) do |group|
          data = group.map { |answer| answer.attributes.except('id') }
          ::Answer.import(group)
        end
      end

      private

      def self.import_external_select_columns
        [
          'id',
          'row_id',
          'indicator_id',
          'child_indicator_id',
          'answer_id',
          'value',
          'weight',
          'iso',
          'year',
          '"answers"."createdAt" AS created_at',
          '"answers"."updatedAt" AS updated_at',
          '"answers"."country4yearId" AS country_4_year_id'
        ]
      end
    end

    class AnswerRegions < ExternalDatabase
      self.table_name = 'answer_region'

      def self.import_external
        i2i_api_data = I2IAPI::AnswerRegion.all.map do |answer_region|
          data = answer_region.
            attributes.except('id').transform_keys { |key| key.to_s.underscore }
          region = ::Region.find_by(iso: data['iso'])
          data['region_4_year_id'] =
            ::Region4Year.find_by(region_id: region.id, year: answer_region.year).id
          data.delete('region4year_id')
          data
        end.compact

        ::AnswerRegion.import(i2i_api_data)
      end
    end

    class OriginalAnswer < ExternalDatabase
      self.table_name = 'original_answer'

      def self.import_external
        i2i_api_data = I2IAPI::OriginalAnswer.all.map do |original_answer|
          data = original_answer.
            attributes.except('id').transform_keys { |key| key.to_s.underscore }
          country = ::Country.find_by(iso: data['iso'])
          data['country_4_year_id'] =
            ::Country4Year.find_by(country_id: country.id, year: original_answer.year).id
          data.delete('country4year_id')
          data
        end.compact

        ::OriginalAnswer.import(i2i_api_data)
      end
    end

    class OriginalAnswerRegions < ExternalDatabase
      self.table_name = 'original_answer_region'

      def self.import_external
        i2i_api_data = I2IAPI::OriginalAnswerRegion.all.map do |original_answer_region|
          data = original_answer_region.
            attributes.except('id').transform_keys { |key| key.to_s.underscore }
          region = ::Region.find_by(iso: data['iso'])
          data['region_4_year_id'] =
            ::Region4Year.find_by(region_id: region.id, year: original_answer_region.year).id
          data.delete('region4year_id')
          data
        end.compact

        ::OriginalAnswerRegion.import(i2i_api_data)
      end
    end
  end
end
