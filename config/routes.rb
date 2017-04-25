Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self) rescue ActiveAdmin::DatabaseHitDuringLoad

  #require 'sidekiq/web'
  #Sidekiq::Web.set :session_secret, Rails.application.secrets[:secret_key_base]
  #authenticate :admin_user do
  #  mount Sidekiq::Web => '/sidekiq'
  #end

  root 'homepage#index'

  get 'community' => 'community#index'

  get 'data-portal' => 'data_portal#index'
  get 'data-portal/:iso/:year', to: 'data_portal#show',
                                as: 'data_portal_y'
  get 'data-portal/indicator', to: 'data_portal/indicator#show',
                               as: 'data_portal_indicator'
  get 'data-portal/report', to: 'data_portal/report#show',
                            as: 'data_portal_report'


  get 'about' => 'static_pages#about'
  get 'terms-of-use', to: 'static_pages#terms_of_use', as: 'terms_of_use'
  get 'privacy-policy', to: 'static_pages#privacy_policy', as: 'privacy_policy'

  resource :contacts, only: :create

  namespace :updates do
    resources :news, only: [:index, :show]
    resources :blogs, only: [:index, :show]
    resources :events, only: [:index, :show]
  end

  scope module: 'updates' do
    resources :news, only: [:index, :show]
  end

  resources :libraries
  resources :updates, only: :index
end
