# == Schema Information
#
# Table name: country_regions
#
#  id         :integer          not null, primary key
#  region_id  :integer
#  country_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CountryRegion < ApplicationRecord
  belongs_to :region, optional: true
  belongs_to :country, optional: true
end
