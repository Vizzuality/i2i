# == Schema Information
#
# Table name: commodities
#
#  id          :integer          not null, primary key
#  country_iso :string
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Commodity < ApplicationRecord
end
