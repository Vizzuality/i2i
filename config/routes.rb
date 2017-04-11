Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self) rescue ActiveAdmin::DatabaseHitDuringLoad

  root 'homepage#index'

  get 'community' => 'community#index'

  get 'data-portal' => 'data_portal#index'
  get 'data-portal/:iso/:year', to: 'data_portal#show', as: 'data_portal_country'

  get 'about' => 'static_pages#about'

  get 'terms-of-use' => 'static_pages#terms_of_use'


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
