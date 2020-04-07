class MobileSurveysDataset < ApplicationRecord
  attr_accessor :file

  validates :year, presence: true
  validates :iso_code, presence: true
  validates :filename, presence: true
end
