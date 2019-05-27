require 'uploaders/dataset_uploader'

class Dataset < ApplicationRecord
  include DatasetUploader[:file]
  
  enum category: [:health, :finance, :agriculture, :education, :other]

  belongs_to :country
  belongs_to :user
  
  validates :name, presence: true
end
