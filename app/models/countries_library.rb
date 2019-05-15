class CountriesLibrary < ApplicationRecord
  belongs_to :country
  belongs_to :library
end
