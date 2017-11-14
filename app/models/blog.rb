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
#  category_id        :integer
#  record_type        :string           default("blog")
#  is_featured        :boolean          default(FALSE)
#  position           :integer
#

class Blog < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  belongs_to :category, required: true

  has_many :tagged_items, :as => :taggable, :dependent => :destroy
  has_many :tags, :through => :tagged_items
  accepts_nested_attributes_for :tagged_items, allow_destroy: true

  has_attached_file :image, styles: {thumb: '300x300>'}

  after_initialize :set_date

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  validates_presence_of :title
  validates :title, uniqueness: { case_sensitive: false }
  validates_length_of :title, maximum: 125
  validates_length_of :summary, maximum: 172, allow_blank: true

  scope :published, -> {where(published: true)}
  scope :featured, -> {where(is_featured: true)}
  scope :author, -> (author) {where(author: author)}

  scope :search_fields, ->(term) do
    where(published: true)
      .joins(:category)
      .joins(:tags)
      .where("lower(blogs.title) LIKE ? OR lower(summary) LIKE ? OR lower(content) LIKE ? OR lower(categories.name) LIKE ? OR lower(tags.name) LIKE ?",
             "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%", "%#{term.downcase}%")
  end

  def set_date
    self.date ||= DateTime.now
  end

  def should_generate_new_friendly_id?
    title_changed?
  end
end
