require "image_processing/mini_magick"

class ImageUploader < Shrine
  ALLOWED_TYPES = %w(image/jpeg image/png image/svg image/svg+xml)
  SVG_TYPES = %w(image/svg image/svg+xml)
  MAX_SIZE = 10*1024*1024 # 10MB
  MAX_WIDTH = 5000
  MAX_HEIGHT = 5000
  
  plugin :processing
  plugin :versions
  plugin :validation_helpers
  plugin :store_dimensions, analyzer: :mini_magick
  plugin :remove_attachment

  Attacher.validate do
    validate_max_size MAX_SIZE
    if validate_mime_type_inclusion(ALLOWED_TYPES)
      validate_max_width MAX_WIDTH
      validate_max_height MAX_HEIGHT
    end
  end
  
  process(:store) do |io, _|
    original = io.download
    
    # No need to resize SVG files
    if SVG_TYPES.include?(io.mime_type)
      thumb = io.download
    else
      thumb = ImageProcessing::MiniMagick
                .source(original)
                .resize_to_limit!(430, 210)
    end
    
    original.close!

    { original: io, thumb: thumb }
  end
end
