Rails.application.routes.draw do
  root 'homepage#index'
  get 'home' => 'homepage#index'

  get 'community' => 'community#index'

  get 'data_portal' => 'data_portal#index'

  get 'about' => 'static_pages#about'

  namespace :data_portal do
    resources :countries, only: :show
    resources :indicators, only: :show
  end

  resources :libraries
  resources :news
end
