def create_countries
  %w(Tanzania Kenya India Bangladesh Nigeria Uganda).each do |country|
    Country.create! name: country
  end
  puts 'Created the countries'
end

def create_indicators
  ['Individuals', 'Household', 'Gender', 'Age', 'Marital Status',
   'Education', 'Rural', 'Employment', 'Urban', 'Income'].each do |indicator|
    Indicator.create name: indicator
  end
  puts 'Created the indicators'
end

namespace :db do
  desc 'Create some sample data for development'
  task sample: :environment do
    create_countries
    create_indicators
  end
end
