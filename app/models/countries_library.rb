# == Schema Information
#
# Table name: countries_libraries
#
#  id         :integer          not null, primary key
#  country_id :integer
#  library_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CountriesLibrary < ApplicationRecord
  belongs_to :country
  belongs_to :library
end
