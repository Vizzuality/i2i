# == Schema Information
#
# Table name: tags
#
#  id          :integer          not null, primary key
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  slug        :string
#  is_featured :boolean          default(FALSE)
#  description :text
#  image_url   :string
#  title       :string
#

class Tag < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  has_many :tagged_items, :dependent => :destroy
  has_many :libraries, :through => :tagged_items, :source => :taggable, :source_type => 'Library'
  has_many :events, :through => :tagged_items, :source => :taggable, :source_type => 'Event'
  has_many :blogs, :through => :tagged_items, :source => :taggable, :source_type => 'Blog'
  has_many :news, :through => :tagged_items, :source => :taggable, :source_type => 'News'
  validates :name, uniqueness: { case_sensitive: false }
  validates_presence_of :title, :if => :is_featured?, message: "must be present if tag is featured"
  validates_presence_of :image_url, :if => :is_featured?, message: "must be present if tag is featured"
  validates_presence_of :description, :if => :is_featured?, message: "must be present if tag is featured"

  scope :featured, -> { where is_featured: true }

  def should_generate_new_friendly_id?
    name_changed?
  end
end
