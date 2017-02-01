# config valid only for current version of Capistrano
lock "3.7.1"

set :application, 'i2i'
set :repo_url, 'git@github.com:Vizzuality/i2i.git'
set :deploy_to, '/var/www/i2i'
set :use_sudo, true

