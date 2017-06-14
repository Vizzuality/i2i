# == Schema Information
#
# Table name: events
#
#  id                 :integer          not null, primary key
#  title              :string
#  summary            :text
#  content            :text
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  date               :datetime
#  author             :string
#  url                :string
#

class Event < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]
  has_attached_file :image, styles: {thumb: '300x300>'}

  after_initialize :set_date

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title, maximum: 75
  validates_length_of :summary, maximum: 150, allow_blank: true
  validates :url, url: true, if: 'url.present?'

  def set_date
    self.date ||= DateTime.now
  end
end
