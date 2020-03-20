# == Schema Information
#
# Table name: country_partners
#
#  id         :integer          not null, primary key
#  country_id :integer
#  partner_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CountryPartner < ApplicationRecord
  belongs_to :country
  belongs_to :partner
end
