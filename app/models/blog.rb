# == Schema Information
#
# Table name: blogs
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
#

class Blog < ApplicationRecord
  has_attached_file :image

  after_initialize :set_date

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title
  validates_length_of :title, maximum: 125
  validates_length_of :summary, maximum: 150, allow_blank: true

  def set_date
    self.date ||= DateTime.now
  end
end
