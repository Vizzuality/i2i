class Answer < ApplicationRecord
  validates :row_id, presence: true
  validates :indicator_id, presence: true
  validates :weight, presence: true
  validates :iso, presence: true
  validates :year, presence: true

  belongs_to :country_4_year, dependent: :destroy
end