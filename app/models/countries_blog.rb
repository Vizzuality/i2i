# == Schema Information
#
# Table name: countries_blogs
#
#  id         :integer          not null, primary key
#  country_id :integer
#  blog_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CountriesBlog < ApplicationRecord
  belongs_to :country
  belongs_to :blog
end
