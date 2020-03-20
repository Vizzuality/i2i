# == Schema Information
#
# Table name: gross_domestic_product_by_regions
#
#  id         :integer          not null, primary key
#  region     :string
#  country    :string
#  year       :integer
#  value      :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GrossDomesticProductByRegion < ApplicationRecord
end
