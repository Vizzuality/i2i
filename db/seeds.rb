# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

if Rails.env != 'production' and AdminUser.where(email: 'admin@example.com').count == 0
  AdminUser.create(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
  User.create!(name: 'Web User', email: 'webuser@example.com', password: 'password', password_confirmation: 'password')
end

# Population data for data portal
if Population.all.count == 0
  CSV.foreach('lib/seeds/population.csv', headers: true, encoding: 'ISO-8859-1', col_sep: ';') do |row, i|
    t = Population.new
    t.region = row['region']
    t.country = row['country']
    t.gender = row['gender']
    t.year = row['year']
    t.value = row['value']
    t.save
  end

  puts "There are now #{Population.count} rows in the Population table"
end

# GDP for data portal
if GrossDomesticProductByRegion.all.count == 0
  CSV.foreach('lib/seeds/gdp_region.csv', headers: true, encoding: 'ISO-8859-1', col_sep: ';') do |row, i|
    t = GrossDomesticProductByRegion.new
    t.region = row['region']
    t.country = row['country']
    t.year = row['year']
    t.value = row['value']
    t.save
  end

  puts "There are now #{GrossDomesticProductByRegion.count} rows in the GrossDomesticProductByRegion table"
end

if GrossDomesticProductBySector.all.count == 0
  CSV.foreach('lib/seeds/gdp_sector.csv', headers: true, encoding: 'ISO-8859-1', col_sep: ',') do |row, i|
    t = GrossDomesticProductBySector.new
    t.region = row['region']
    t.country = row['country']
    t.year = row['year']
    t.sector = row['sector']
    t.value = row['value']
    t.save
  end

  puts "There are now #{GrossDomesticProductBySector.count} rows in the GrossDomesticProductBySector table"
end

if CapitalCity.all.count == 0
  CSV.foreach('lib/seeds/capital.csv', headers: true, encoding: 'ISO-8859-1', col_sep: ',') do |row, i|
    t = CapitalCity.new
    t.name = row['capital_city']
    t.country_iso = row['iso']
    t.population = row['population']
    t.capital_type = row['capital_type']
    t.save
  end

  CapitalCity.create(name: 'Dodoma', country_iso: 'TZA', capital_type: 'Capital', population: 410)

  puts "There are now #{CapitalCity.count} rows in the CapitalCity table"
end

if Commodity.all.count == 0
  CSV.foreach('lib/seeds/commodities.csv', headers: true, encoding: 'ISO-8859-1', col_sep: ',') do |row, i|
    t = Commodity.new
    t.country_iso = row['iso']
    t.description = row['description']
    t.save
  end

  puts "There are now #{Commodity.count} rows in the Commodity table"
end
