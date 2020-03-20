# == Schema Information
#
# Table name: countries_events
#
#  id         :integer          not null, primary key
#  country_id :integer
#  event_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CountriesEvent < ApplicationRecord
  belongs_to :country
  belongs_to :event
end
