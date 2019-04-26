require "shrine"
require "shrine/storage/file_system"

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new("public", prefix: "system/cache"), # temporary
  store: Shrine::Storage::FileSystem.new("public", prefix: "system"),       # permanent
}

Shrine.plugin :activerecord
Shrine.plugin :logging
Shrine.plugin :determine_mime_type
Shrine.plugin :pretty_location
Shrine.plugin :cached_attachment_data
Shrine.plugin :restore_cached_data

