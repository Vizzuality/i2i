class CountryRegion < ApplicationRecord
  belongs_to :region
  belongs_to :country
end
