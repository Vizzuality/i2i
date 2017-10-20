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

  # Data Portal
  get 'data-portal' => 'data_portal#index'
  get 'data-portal/:iso' => 'data_portal#country_preview', as: 'data_portal_country_preview'
  
  # Data Portal - Financial Diaries
  get 'data-portal/:iso/financial-diaries', to: 'data_portal_financial_diaries#index',
                                                  as: 'data_portal_financial_diaries'

  # Data Portal - FinScope Data
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

  get 'search' => 'searches#index'

  resource :contacts, only: :create

  scope :format => true, :constraints => { :format => 'json' } do
    post   "/login"       => "sessions#create"
    delete "/logout"      => "sessions#destroy"
  end

  # Insights
  get 'insights/:category/:slug', to: 'insights#show', as: 'insights_show'
  get 'insights/:category', to: 'insights#index', as: 'insights_filter_index'
  get 'insights', to: 'insights#index'

  # Initiatives
  get 'initiatives/:tag/:slug', to: 'initiatives#show', as: 'initiatives_show'
  get 'initiatives/:tag', to: 'initiatives#filter_index', as: 'initiatives_filter_index'
  get 'initiatives', to: 'initiatives#index'

  # Tools
  get 'tools' => 'tools#index'

  namespace :fdapi do
    resources :household_transactions, only: [:index, :show]
    resources :household_member_transactions, only: [:index, :show]
    resources :category_usages, only: [:index, :show]
    resources :project_metadata, only: [:index, :show]
    get 'project_min_max/:project_name', to: 'project_metadata#project_min_max'
    get 'project_means/:project_name', to: 'project_metadata#project_means'
  end

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
