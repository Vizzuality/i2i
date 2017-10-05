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
#  author             :string
#  workstream         :string
#  issuu_link         :string
#  slug               :string
#  published          :boolean
#  custom_author      :string
#  subcategory_id     :integer
#  record_type        :string           default("blog")
#  category_id        :integer
#

class Blog < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  belongs_to :subcategory, required: false
  belongs_to :category, required: true
  accepts_nested_attributes_for :subcategory

  has_attached_file :image, styles: {thumb: '300x300>'}

  after_initialize :set_date

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title
  validates :title, uniqueness: { case_sensitive: false }
  validates_length_of :title, maximum: 125
  validates_length_of :summary, maximum: 172, allow_blank: true

  validate :subcategory_is_valid

  scope :published, -> {where(published: true)}

  def set_date
    self.date ||= DateTime.now
  end

  def subcategory_is_valid
    if subcategory.present?
      errors.add(:invalid_subcategory, "- must belong to the same Category") if category.id != subcategory.category_id
    end
  end
end
