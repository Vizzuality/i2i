class Region < ApplicationRecord
  extend FriendlyId
  friendly_id :iso_id_candidates, use: :slugged
  
  validates :name, :iso, :slug, presence: true
  
  def should_generate_new_friendly_id?
    iso_changed? || super
  end
  
  # To include name in slug generation if iso is not unique
  def iso_id_candidates
    [:iso, [:iso, :name]]
  end
end
