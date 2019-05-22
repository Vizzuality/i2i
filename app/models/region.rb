require 'uploaders/image_uploader'

class Region < ApplicationRecord
  extend FriendlyId
  include FinscopeApi
  include ImageUploader[:flag]
  include ImageUploader[:logo]

  attr_accessor :has_finscope

  friendly_id :iso_id_candidates, use: :slugged

  validates :name, :iso, :slug, presence: true

  has_many :country_regions, dependent: :destroy
  has_many :countries, through: :country_regions

  has_many :region_partners, dependent: :destroy
  has_many :partners, through: :region_partners

  has_many :blogs_regions, dependent: :destroy
  has_many :events_regions, dependent: :destroy
  has_many :libraries_regions, dependent: :destroy
  has_many :news_regions, dependent: :destroy
  has_many :blogs, through: :blogs_regions
  has_many :events, through: :events_regions
  has_many :libraries, through: :libraries_regions
  has_many :news, through: :news_regions

  has_many :links, dependent: :destroy
  accepts_nested_attributes_for :links

  def finscope
    FinscopeApi.get_regions.find { |c| c[:iso] == iso }
  end

  def should_generate_new_friendly_id?
    iso_changed? || super
  end

  # To include name in slug generation if iso is not unique
  def iso_id_candidates
    [:iso, [:iso, :name]]
  end
end
