# == Schema Information
#
# Table name: indicators
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  date       :datetime
#

class Indicator < ApplicationRecord
end
