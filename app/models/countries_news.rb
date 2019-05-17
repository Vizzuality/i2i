class CountriesNews < ApplicationRecord
  belongs_to :country
  belongs_to :news
end
