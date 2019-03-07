def create_countries
  [
    { name: 'Ghana', iso: 'GHA', short_iso: 'GHA' },
    { name: 'Kenya', iso: 'KEN', short_iso: 'KEN' },
    { name: 'Mozambique', iso: 'MOZ', short_iso: 'MOZ '},
    { name: 'Pakistan', iso: 'PAK', short_iso: 'PAK '},
    { name: 'Tanzania', iso: 'TZA', short_iso: 'TZA '},
    { name: 'Rwanda', iso: 'RWA', short_iso: 'RWA '},
    { name: 'Uganda', iso: 'UGA', short_iso: 'UGA '},
    { name: 'Zambia', iso: 'ZMB', short_iso: 'ZMB '},
    { name: 'South Africa', iso: 'ZFA', short_iso: 'ZFA '},
    { name: 'Mexico', iso: 'MEX', short_iso: 'MEX '},
    { name: 'Bangladesh', iso: 'BGD', short_iso: 'BGD '},
    { name: 'Nigeria', iso: 'NGA', short_iso: 'NGA '},
    { name: 'Côte d\'\'Ivoire', iso: 'CIV', short_iso: 'CIV '}
  ].each do |country|
    Country.create! name: country[:name], iso: country[:iso], short_iso: country[:short_iso]
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
