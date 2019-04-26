class CountryPartner < ApplicationRecord
  belongs_to :country
  belongs_to :partner
end
