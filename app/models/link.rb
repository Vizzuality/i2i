class Link < ApplicationRecord
  belongs_to :country, optional: true
  belongs_to :region, optional: true

  validates :url, url: true, presence: true
end
