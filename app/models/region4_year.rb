class Region4Year < ApplicationRecord
  self.table_name = 'region_4_years'

  validates :year, presence: true, uniqueness: {scope: :region_id}

  belongs_to :region
end
