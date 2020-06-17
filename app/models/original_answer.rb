class OriginalAnswer < ApplicationRecord
  validates :answer, presence: true
  validates :iso, presence: true
  validates :year, presence: true

  belongs_to :country_4_year, dependent: :destroy
end
