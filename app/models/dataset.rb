require 'uploaders/dataset_uploader'

class Dataset < ApplicationRecord
  include DatasetUploader[:file]
  
  enum category: [:health, :finance, :agriculture, :education, :other]
  enum status: [:unpublished, :pending, :published]

  belongs_to :country
  belongs_to :user
  
  validates :name, presence: true
  
  def file_absolute_url
    root_url = Rails.application.routes.url_helpers.root_url(
      host: ActionMailer::Base.default_url_options[:host],
      port: ActionMailer::Base.default_url_options[:port]
    )

    URI.join(root_url, file.url).to_s
  end
end
