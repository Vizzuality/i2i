require 'uploaders/dataset_uploader'

class Dataset < ApplicationRecord
  REQUIRED_CSV_HEADERS = %w(
    country
    field_1
    sector
    type
    land_use
    iso
    lat
    lng
    year
    name
    color
  )

  include DatasetUploader[:file]

  enum category: [:health, :finance, :agriculture, :education, :other]
  enum status: [:unpublished, :pending, :published]

  belongs_to :country
  belongs_to :user

  validates :name, presence: true

  def file_absolute_url
    root_url = Rails.application.routes.url_helpers.root_url(
      protocol: Rails.env === 'production' ? 'https' : nil,
      host: ActionMailer::Base.default_url_options[:host],
      port: ActionMailer::Base.default_url_options[:port]
    )

    URI.join(root_url, file.url).to_s
  end

  def csv_is_valid
    csv_errors.blank?
  end

  def is_valid_for_preview
    headers = missing_headers
    return true if missing_headers.blank?

    %w(lat lng).none? { |header| !headers.include? header }
  end

  def missing_headers
    headers = CSV.open("public#{self.file_url}", 'r') { |csv| csv.first }

    REQUIRED_CSV_HEADERS.reject { |required_header| headers.include? required_header }
  end

  def csv_errors
    headers = missing_headers

    if headers.any?
      "Missing headers: #{headers.join(', ')}"
    end
  end
end
