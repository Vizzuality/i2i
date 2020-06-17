# == Schema Information
#
# Table name: countries_news
#
#  id         :integer          not null, primary key
#  country_id :integer
#  news_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CountriesNews < ApplicationRecord
  belongs_to :country
  belongs_to :news
end
