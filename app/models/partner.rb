require 'uploaders/partner_logo_uploader'

class Partner < ApplicationRecord
  include PartnerLogoUploader[:logo]
  
  validates :name, presence: true
  
  has_many :region_partners, dependent: :destroy
  has_many :regions, through: :region_partners
  
  has_many :country_partners, dependent: :destroy
  has_many :countries, through: :country_partners
end
