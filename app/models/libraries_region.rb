# == Schema Information
#
# Table name: libraries_regions
#
#  id         :integer          not null, primary key
#  library_id :integer
#  region_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class LibrariesRegion < ApplicationRecord
  belongs_to :library
  belongs_to :region
end
