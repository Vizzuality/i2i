# == Schema Information
#
# Table name: events_regions
#
#  id         :integer          not null, primary key
#  event_id   :integer
#  region_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class EventsRegion < ApplicationRecord
  belongs_to :event
  belongs_to :region
end
