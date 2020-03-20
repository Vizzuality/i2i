# == Schema Information
#
# Table name: populations
#
#  id         :integer          not null, primary key
#  region     :string
#  country    :string
#  gender     :string
#  year       :integer
#  value      :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Population < ApplicationRecord
end
