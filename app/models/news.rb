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
#  author             :string
#  issuu_link         :string
#  slug               :string
#  published          :boolean
#  subcategory_id     :integer
#

class News < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]
  self.table_name = 'news'

  belongs_to :subcategory, required: true
  delegate :category, to: :subcategory, allow_nil: false
  accepts_nested_attributes_for :subcategory

  after_initialize :set_date

  # Validations for paperclip
  has_attached_file :image, styles: {thumb: '300x300>'}
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title
  validates :title, uniqueness: { case_sensitive: false }
  validates_length_of :title, maximum: 75
  validates_length_of :summary, maximum: 172, allow_blank: true

  scope :published, -> {where(published: true)}

  def set_date
    self.date ||= DateTime.now
  end
end
