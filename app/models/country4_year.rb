# == Schema Information
#
# Table name: country_4_years
#
#  id         :bigint(8)        not null, primary key
#  year       :integer
#  total_msme :float
#  total      :float
#  data_url   :string
#  country_id :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Country4Year < ApplicationRecord
  self.table_name = 'country_4_years'

  validates :year, presence: true, uniqueness: {scope: :country_id}

  belongs_to :country
end
