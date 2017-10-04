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

  get 'resources(/:category)', to: 'libraries#index', as: 'libraries'

  post 'email' => 'static_pages#email'
  get 'about' => 'static_pages#about'
  get 'terms-of-use', to: 'static_pages#terms_of_use', as: 'terms_of_use'
  get 'privacy-policy', to: 'static_pages#privacy_policy', as: 'privacy_policy'

  resource :contacts, only: :create

  scope :format => true, :constraints => { :format => 'json' } do
    post   "/login"       => "sessions#create"
    delete "/logout"      => "sessions#destroy"
  end

  get 'insights/:category/:slug', to: 'insights#show', as: 'filter_insights'

  resources :insights, only: [:index]
  resources :household_transactions, only: [:index, :show]
  resources :household_member_transactions, only: [:index, :show]
  resources :category_usages, only: [:index, :show]
  resources :project_metadata, only: [:index, :show]

  namespace :updates do
    get 'news/preview', to: 'news#preview'
    get 'blogs/preview', to: 'blogs#preview'
    get 'events/preview', to: 'events#preview'

    resources :news, only: [:index, :show]
    resources :blogs, only: [:index, :show]
    resources :events, only: [:index, :show]
  end

  scope module: 'updates' do
    resources :news, only: [:index, :show]
  end

  resources :updates, only: :index

  match "/404", :to => "errors#not_found", :via => :all
end
