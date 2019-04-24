require 'uploaders/image_uploader'

class Region < ApplicationRecord
  extend FriendlyId
  include ImageUploader[:flag]
  include ImageUploader[:logo]
  
  friendly_id :iso_id_candidates, use: :slugged
  
  validates :name, :iso, :slug, presence: true
  
  has_many :country_regions, dependent: :destroy
  has_many :countries, through: :country_regions
  
  has_many :region_partners, dependent: :destroy
  has_many :partners, through: :region_partners
  
  def should_generate_new_friendly_id?
    iso_changed? || super
  end
  
  # To include name in slug generation if iso is not unique
  def iso_id_candidates
    [:iso, [:iso, :name]]
  end
end
