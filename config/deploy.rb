# config valid only for current version of Capistrano
lock "3.7.1"

set :application, 'i2i'
set :repo_url, 'git@github.com:Vizzuality/i2i.git'
set :deploy_to, '/var/www/i2i'
set :use_sudo, true

set :deploy_user, 'ubuntu'
set :rvm_ruby_version, '2.3.1'
set :keep_releases, 5
set :use_sudo, true
set :linked_files, %w{.env}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :deploy do
  after :finishing, 'deploy:cleanup'
  after 'deploy:publishing', 'deploy:restart'
end

