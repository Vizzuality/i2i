class CountriesBlog < ApplicationRecord
  belongs_to :country
  belongs_to :blog
end
