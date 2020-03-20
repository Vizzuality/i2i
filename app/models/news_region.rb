# == Schema Information
#
# Table name: news_regions
#
#  id         :integer          not null, primary key
#  news_id    :integer
#  region_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class NewsRegion < ApplicationRecord
  belongs_to :news
  belongs_to :region
end
