Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'homepage#index'

  get 'community' => 'community#index'

  get 'data_portal' => 'data_portal#index'

  get 'about' => 'static_pages#about'


  namespace :updates do
    resources :news, only: [:index, :show]
    resources :blogs, only: [:index, :show]
    resources :events, only: [:index, :show]
  end

  scope :news, controller: [:updates, :news] do
    resources :news, only: [:index, :show]
  end

  namespace :data_portal do
    resources :countries, only: :show
    resources :indicators, only: :show
  end

  resources :libraries
  resources :updates, only: :index
end
