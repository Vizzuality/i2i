# == Schema Information
#
# Table name: capital_cities
#
#  id           :integer          not null, primary key
#  name         :string
#  population   :integer
#  country_iso  :string
#  capital_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class CapitalCity < ApplicationRecord
end
