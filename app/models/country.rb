# == Schema Information
#
# Table name: countries
#
#  id           :integer          not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  name         :string
#  iso          :string
#  bbox         :string           default([]), is an Array
#  short_iso    :string
#  has_fsp_maps :boolean          default(FALSE)
#

class Country < ApplicationRecord
  include FinscopeApi

  validates :name, presence: true
  validates :iso, presence: true
  validates :short_iso, presence: true

  scope :all_except, ->(country) { where.not(id: country) }

  attr_accessor :has_finscope
  attr_accessor :has_financial_diaries
  attr_accessor :bbox_raw

  def has_dataset
    financial_diaries.present? || finscope.present? || geospatial.present?
  end

  def finscope
    FinscopeApi.get_countries.find { |c| c[:iso] == iso }
  end

  def financial_diaries
    ProjectMetadatum.find_by(country_iso3: iso)
  end

  def geospatial
    has_fsp_maps
  end

  def bbox_raw
    self.bbox.join(",") unless self.bbox.nil?
  end

  def bbox_raw=(values)
    self.bbox = []
    self.bbox = values.split(",")
  end

  class << self
    def finscope_country_list
      FinscopeApi.get_countries
    end
  end
end
