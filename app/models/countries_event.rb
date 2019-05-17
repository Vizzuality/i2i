class CountriesEvent < ApplicationRecord
  belongs_to :country
  belongs_to :event
end
