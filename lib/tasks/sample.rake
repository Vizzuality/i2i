def create_countries
  [
    {name: 'Tanzania', iso: 'TAN'},
    {name: 'Kenya', iso: 'KEN'},
    {name: 'India', iso: 'IND'},
    {name: 'Bangladesj', iso: 'BAN'},
    {name: 'Nigeria', iso: 'NIG'},
    {name: 'Uganda', iso: 'UGA'}
  ].each do |country|
    Country.create! name: country[:name], iso: country[:iso]
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
