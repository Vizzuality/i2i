Rails.application.routes.draw do
  root 'static_pages#home'
  get 'home' => 'static_pages#home'

  get 'about' => 'static_pages#about'

  get 'community' => 'static_pages#community'

  get 'data_portal' => 'static_pages#data_portal'

  namespace :data_portal do
    resources :countries, only: :show
    resources :indicators, only: :show
  end

  resources :libraries
  resources :news
end
