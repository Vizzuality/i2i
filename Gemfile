source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.3.3'

gem 'rails', '~> 5.0.1'
gem 'pg'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'autoprefixer-rails', '~> 6.7'

gem 'rails-backbone', '~> 1.2'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'gon'

source 'https://rails-assets.org' do
  gem 'rails-assets-d3', '~> 3.5.16'
  gem 'rails-assets-vega', '~> 2.6.5'
  gem 'rails-assets-datalib', '1.7.3'
end

gem 'dotenv-rails', '~> 2.1'

# Active admin gems

gem 'activeadmin', github: 'activeadmin'
gem 'devise'

# File upload gems
gem 'paperclip'

# WYSIWYG
gem 'ckeditor', github: 'galetahub/ckeditor'

gem 'enumerate_it'
gem 'valid_url'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

group :development, :test do
  gem 'byebug', platform: :mri
end

group :development do
  gem 'annotate'
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

# Deploy
  gem 'capistrano', '3.7.1'
  gem 'capistrano-rails'
  gem 'capistrano-bundler'
  gem 'capistrano-rvm'
  gem 'capistrano-passenger'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
