# == Schema Information
#
# Table name: countries
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  iso        :string
#

class Country < ApplicationRecord

end
