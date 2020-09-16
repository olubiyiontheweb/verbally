Rails.application.routes.draw do
  # Api version 1 routes
  namespace :api do
    namespace :v1 do
      defaults format: :json do
        # to suport signing up, editing, login in  users via the api

        # remember to skip registrations, user accounts should be deactivated not destroyed
        devise_for :users, controllers: {
          sessions: 'api/v1/sessions',
          registrations: 'api/v1/registrations',
          confirmations: 'api/v1/confirmations'
        }
        # devise_for :users, constraints: { format: 'json' }
        # resources :users, only: %i[new edit show]

        # namespace :users do
          # Registrations
          # get   '/sign_in'   => 'api/v1/sessions#new'
          # post  '/sign_in'   => 'api/v1/sessions#create'
        # end

        # to display user details
        resources :users, only: [:show]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
