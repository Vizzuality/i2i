def create_countries
  [
    {name: 'Ghana', iso: 'GHA'},
    {name: 'Kenya', iso: 'KEN'},
    {name: 'Mozambique', iso: 'MOZ'},
    {name: 'Pakistan', iso: 'PAK'},
    {name: 'Tanzania', iso: 'TZA'},
    {name: 'Rwanda', iso: 'RWA'},
    {name: 'Uganda', iso: 'UGA'},
    {name: 'Zambia', iso: 'ZMB'},
    {name: 'South Africa', iso: 'ZFA'},
    {name: 'Mexico', iso: 'MEX'},
    {name: 'Bangladesh', iso: 'BGD'},
    {name: 'Nigeria', iso: 'NGA'},
    {name: 'Côte d\'\'Ivoire', iso: 'CIV'}
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
