# == Schema Information
#
# Table name: gross_domestic_product_by_sectors
#
#  id         :integer          not null, primary key
#  sector     :string
#  region     :string
#  country    :string
#  year       :integer
#  value      :float
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class GrossDomesticProductBySector < ApplicationRecord
end
