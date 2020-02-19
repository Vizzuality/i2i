class CountryRegion < ApplicationRecord
  belongs_to :region, optional: true
  belongs_to :country, optional: true
end
