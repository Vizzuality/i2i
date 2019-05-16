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

  puts "There are now #{Population.count} rows in the transactions table"
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

  puts "There are now #{GrossDomesticProductByRegion.count} rows in the transactions table"
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

  puts "There are now #{GrossDomesticProductBySector.count} rows in the transactions table"
end