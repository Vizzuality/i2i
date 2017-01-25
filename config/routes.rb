Rails.application.routes.draw do
  root 'static_pages#home'
  get 'home' => 'static_pages#home'

  get 'about' => 'static_pages#about'

  get 'community' => 'static_pages#community'

  get 'data_portal' => 'static_pages#data_portal'

  resources :libraries
  resources :news
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
