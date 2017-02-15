# == Schema Information
#
# Table name: indicators
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#

class Indicator < ApplicationRecord
end
