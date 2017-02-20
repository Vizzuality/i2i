# == Schema Information
#
# Table name: news
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
#  date               :datetime
#  highlight          :boolean
#

class News < ApplicationRecord
  self.table_name = 'news'

  # Validations for paperclip
  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title

end
