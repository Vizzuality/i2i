require 'uploaders/dataset_uploader'

class Dataset < ApplicationRecord
  include DatasetUploader[:file]
  
  belongs_to :category
  belongs_to :country
  belongs_to :user
  
  validates :name, presence: true
end
