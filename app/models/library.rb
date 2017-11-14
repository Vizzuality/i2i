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
#  issuu_link         :string
#  slug               :string
#  published          :boolean
#  category_id        :integer
#  record_type        :string           default("library")
#  is_featured        :boolean          default(FALSE)
#  position           :integer
#

class Library < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]
  extend EnumerateIt

  belongs_to :category, required: true

  has_attached_file :image, styles: {thumb: '300x300>'}
  has_many :tagged_items, :as => :taggable, :dependent => :destroy
  has_many :tags, :through => :tagged_items
  accepts_nested_attributes_for :tagged_items, allow_destroy: true

  has_one :documented_item, as: :documentable
  has_one :document, through: :documented_item
  accepts_nested_attributes_for :documented_item, allow_destroy: true
  accepts_nested_attributes_for :document, allow_destroy: true

  after_initialize :set_date

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title
  validates :title, uniqueness: { case_sensitive: false }
  validates :url_resource, url: true, if: 'url_resource.present?'
  validates :video_url, url: true, if: 'video_url.present?'
  validates_length_of :title, maximum: 70
  validates_length_of :summary, maximum: 172, allow_blank: true

  scope :published, -> {where(published: true)}
  scope :featured, -> {where(is_featured: true)}

  scope :search_fields, ->(term) do
    where(published: true)
     .joins(:category)
     .joins(:tags)
     .where("lower(libraries.title) LIKE ? OR lower(summary) LIKE ? OR lower(categories.name) LIKE ? OR lower(tags.name) LIKE ?",
            "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%")
   end

  def set_date
    self.date ||= DateTime.now
  end

  def should_generate_new_friendly_id?
    title_changed?
  end
end
