Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'homepage#index'

  get 'community' => 'community#index'

  get 'data_portal' => 'data_portal#index'

  get 'about' => 'static_pages#about'

  concern :shared_actions do
    resources :news, only: [:index, :show]
  end

  namespace :updates do
    concerns :shared_actions
    resources :blogs, only: [:index, :show]
    resources :events, only: [:index, :show]
  end

  concerns :shared_actions

  namespace :data_portal do
    resources :countries, only: :show
    resources :indicators, only: :show
  end

  resources :libraries
  resources :updates, only: :index
end
