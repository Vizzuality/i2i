class DatasetUploader < Shrine
  ALLOWED_TYPES = %w(image/jpeg image/png image/svg image/svg+xml)
  MAX_SIZE = 5*1024*1024 # 5MB

  plugin :validation_helpers
  plugin :remove_attachment

  Attacher.validate do
    validate_max_size MAX_SIZE
  end
end
