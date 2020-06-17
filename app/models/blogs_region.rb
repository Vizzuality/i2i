# == Schema Information
#
# Table name: blogs_regions
#
#  id         :integer          not null, primary key
#  blog_id    :integer
#  region_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BlogsRegion < ApplicationRecord
  belongs_to :blog
  belongs_to :region
end
