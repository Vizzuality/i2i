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
#  category_id        :integer
#  record_type        :string           default("event")
#  is_featured        :boolean          default(FALSE)
#  position           :integer
#

class Event < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  belongs_to :category, required: true

  has_one :featured_position, as: :positionable, dependent: :destroy
  accepts_nested_attributes_for :featured_position, allow_destroy: true

  has_many :countries_events
  has_many :countries, through: :countries_events

  has_many :events_regions, dependent: :destroy
  has_many :regions, through: :events_regions
  
  has_many :tagged_items, :as => :taggable, :dependent => :destroy
  has_many :tags, :through => :tagged_items
  accepts_nested_attributes_for :tagged_items, allow_destroy: true

  has_attached_file :image, styles: {thumb: '300x300>'}
  has_many :documents, :through => :documented_items
  accepts_nested_attributes_for :documents, allow_destroy: true
  has_many :documented_items, :as => :documentable, :dependent => :destroy
  accepts_nested_attributes_for :documented_items, allow_destroy: true

  after_initialize :set_date
  after_save :needs_featured_position

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title, maximum: 75
  validates :title, uniqueness: { case_sensitive: false }
  validates_length_of :summary, maximum: 172, allow_blank: true
  validates :url, url: true, if: 'url.present?'


  scope :published, -> {where(published: true)}
  scope :featured, -> {where(is_featured: true)}

  scope :search_fields, ->(term) do
    where(published: true)
      .joins(:category)
      .where("lower(events.title) LIKE ? OR lower(summary) LIKE ? OR lower(content) LIKE ? OR lower(categories.name) LIKE ?",
             "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%")
      .distinct
  end

  scope :search_tags, ->(term) do
    where(published: true)
     .joins(:tags)
     .where("lower(tags.slug) LIKE ?", "%#{term.downcase}%")
     .distinct
   end

  def set_date
    self.date ||= DateTime.now
  end

  def should_generate_new_friendly_id?
    title_changed?
  end
end
