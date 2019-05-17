class Link < ApplicationRecord
  belongs_to :country
  belongs_to :region
  
  validates :url, url: true, presence: true
end
