# == Schema Information
#
# Table name: links
#
#  id         :integer          not null, primary key
#  name       :string
#  url        :string           default(""), not null
#  country_id :integer
#  region_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Link < ApplicationRecord
  belongs_to :country, optional: true
  belongs_to :region, optional: true

  validates :url, url: true, presence: true
end
