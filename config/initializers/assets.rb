# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( data_portal.js )
Rails.application.config.assets.precompile += %w( data_portal_financial_diaries.js )
Rails.application.config.assets.precompile += %w( data_portal_financial_diaries_embed.js )
Rails.application.config.assets.precompile += %w( exported_components.js )
Rails.application.config.assets.precompile += %w( exported_components.css )

# Precompile the assets for CKeditor
Rails.application.config.assets.precompile += %w( ckeditor/* )
