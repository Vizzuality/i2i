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
#  slug               :string
#  published          :boolean
#  custom_author      :string
#  record_type        :string           default("event")
#  category_id        :integer
#  is_featured        :boolean          default(FALSE)
#

class Event < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  belongs_to :category, required: true

  has_many :tagged_items, :as => :taggable, :dependent => :destroy
  has_many :tags, :through => :tagged_items
  accepts_nested_attributes_for :tagged_items, allow_destroy: true

  has_attached_file :image, styles: {thumb: '300x300>'}
  has_many :documents, :through => :documented_items
  accepts_nested_attributes_for :documents, allow_destroy: true
  has_many :documented_items, :as => :documentable, :dependent => :destroy
  accepts_nested_attributes_for :documented_items, allow_destroy: true

  after_initialize :set_date

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title, maximum: 75
  validates :title, uniqueness: { case_sensitive: false }
  validates_length_of :summary, maximum: 172, allow_blank: true
  validates :url, url: true, if: 'url.present?'


  scope :published, -> {where(published: true)}
  scope :featured, -> {where(is_featured: true)}

  def set_date
    self.date ||= DateTime.now
  end

  def should_generate_new_friendly_id?
    title_changed?
  end
end
