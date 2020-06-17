# == Schema Information
#
# Table name: region_partners
#
#  id         :integer          not null, primary key
#  region_id  :integer
#  partner_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class RegionPartner < ApplicationRecord
  belongs_to :partner
  belongs_to :region
end
