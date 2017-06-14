# == Schema Information
#
# Table name: libraries
#
#  id                 :integer          not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  title              :string
#  summary            :text
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  date               :datetime
#  url_resource       :string
#  video_url          :string
#  subcategory_id     :integer
#  issuu_link         :string
#

class Library < ApplicationRecord
  extend EnumerateIt

  belongs_to :subcategory, required: true
  delegate :category, to: :subcategory, allow_nil: false
  accepts_nested_attributes_for :subcategory

  has_attached_file :image, styles: {thumb: '300x300>'}

  after_initialize :set_date

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title
  validates :url_resource, url: true, if: 'url_resource.present?'
  validates :video_url, url: true, if: 'video_url.present?'
  validates_length_of :title, maximum: 70
  validates_length_of :summary, maximum: 172, allow_blank: true

  def set_date
    self.date ||= DateTime.now
  end
end
