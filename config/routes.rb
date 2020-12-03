Rails.application.routes.draw do
  # Api version 1 routes
  namespace :api do
    namespace :v1 do
      defaults format: :json do
        # to suport signing up, editing, login in  users via the api

        # remember to skip registrations, user accounts should be deactivated not destroyed
        devise_for :users, controllers: {
          sessions: 'api/v1/sessions',
          registrations: 'api/v1/registrations'
        }
        # devise_for :users, constraints: { fosrmat: 'json' }
        # resources :users, only: %i[new edit show]

        # namespace :users do
        #   post  '/sign_in'   => 'sessions#create'
        #   delete   '/sign_out'   => 'sessions#destroy'
        #   post  '/'   => 'registrations#create'
        #   delete   '/'   => 'registrations#destroy'
        #   post  '/confirmation'   => 'confirmations#create'
        #   get   '/confirmation'   => 'confirmations#show'
        # end

        # resources :sessions, only: [:create, :destroy], path: 'users/sign_in'
        # resources :sessions, only: [:destroy], path: 'users/sign_out'
        # resources :registrations, only: [:create, :destroy], path: 'users'
        # resources :confirmations, only: [:create, :show], path: 'users/confirmation'

        # to display user details
        resources :users, only: [:show]
        resources :confirmations, only: [:show]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
