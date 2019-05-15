class EventsRegion < ApplicationRecord
  belongs_to :event
  belongs_to :region
end
