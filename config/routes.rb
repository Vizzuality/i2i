Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'homepage#index'

  get 'community' => 'community#index'

  get 'data-portal' => 'data_portal#index'
  get 'data-portal/:iso/:year' => 'data_portal#show'

  get 'about' => 'static_pages#about'


  namespace :updates do
    resources :news, only: [:index, :show]
    resources :blogs, only: [:index, :show]
    resources :events, only: [:index, :show]
  end

  scope :news, controller: [:updates, :news] do
    resources :news, only: [:index, :show]
  end

  resources :libraries
  resources :updates, only: :index
end
