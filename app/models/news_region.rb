class NewsRegion < ApplicationRecord
  belongs_to :news
  belongs_to :region
end
