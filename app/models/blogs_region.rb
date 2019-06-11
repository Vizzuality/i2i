class BlogsRegion < ApplicationRecord
  belongs_to :blog
  belongs_to :region
end
