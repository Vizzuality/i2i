class OriginalAnswerRegion < ApplicationRecord
  validates :answer, presence: true
  validates :iso, presence: true
  validates :year, presence: true

  belongs_to :region_4_year, dependent: :destroy
end
