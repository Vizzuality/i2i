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
#

class Library < ApplicationRecord
  extend EnumerateIt

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  has_enumeration_for :content_type, with: LibraryType, skip_validation: true

  validates_presence_of :title, :content_type
end
