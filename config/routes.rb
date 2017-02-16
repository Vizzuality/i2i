Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'homepage#index'

  get 'community' => 'community#index'

  get 'data_portal' => 'static_pages#data_portal'

  get 'about' => 'static_pages#about'

  namespace :data_portal do
    resources :countries, only: :show
    resources :indicators, only: :show
  end

  resources :libraries
  resources :news
end
