Rails.application.routes.draw do
  # Api version 1 routes
  namespace :api do
    namespace :v1 do
      defaults format: :json do
        # to suport signing up, editing, login in  users via the api

        # remember to skip registrations, user accounts should be deactivated not destroyed
        devise_for :users
        # devise_for :users, constraints: { format: 'json' }
        # resources :users, only: %i[new edit show]

        # to display user details
        resources :users, only: [:show]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
