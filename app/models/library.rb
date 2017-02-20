# == Schema Information
#
# Table name: libraries
#
#  id                 :integer          not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  title              :string
#  summary            :text
#  content            :text
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  content_type       :string
#  date               :datetime
#  url_resource       :string
#  video_url          :string
#

class Library < ApplicationRecord
  extend EnumerateIt

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  has_enumeration_for :content_type, with: LibraryType, skip_validation: true

  validates_presence_of :title, :content_type
  validates :url_resource, url: true, if: 'url_resource.present?'
  validates :video_url, url: true, if: 'video_url.present?'
  validates_length_of :summary, maximum: 150, allow_blank: true

end
