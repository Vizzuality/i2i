# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ApplicationRecord
	has_many :tagged_items, :dependent => :destroy
	has_many :libraries, :through => :tagged_items, :source => :taggable, :source_type => 'Library'
end
