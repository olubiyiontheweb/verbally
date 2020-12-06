Rails.application.routes.draw do
  # Api version 1 routes
  namespace :api do
    namespace :v1 do
      defaults format: :json do
        # to suport signing up, editing, login in  accounts via the api

        # remember to skip registrations, account accounts should be deactivated not destroyed
        devise_for :accounts, skip: %i[confirmation sessions], controllers: {
          # confirmations: 'api/v1/accounts/confirmations',
          registrations: 'api/v1/accounts/registrations'
        }
        # devise_for :accounts, constraints: { fosrmat: 'json' }
        # resources :accounts, only: %i[new edit show]

        # namespace :accounts do
        #   post  '/sign_in'   => 'sessions#create'
        #   delete   '/sign_out'   => 'sessions#destroy'
        #   post  '/'   => 'registrations#create'
        #   delete   '/'   => 'registrations#destroy'
        #   yarn  '/confirmation'   => 'confirmations#create'
        #   get   '/confirmation'   => 'confirmations#show'
        # end

        # resources :sessions, only: [:create, :destroy], path: 'accounts/sign_in'
        # resources :sessions, only: [:destroy], path: 'accounts/sign_out'
        # resources :registrations, only: [:create, :destroy], path: 'accounts'
        # resources :confirmations, only: [:create, :show], path: 'accounts/confirmation'

        # to display account details
        resources :accounts, only: %i[show index], module: 'accounts'

        namespace :accounts do
          post '/sign_in' => 'sessions#create'
          delete '/sign_out' => 'sessions#destroy'
          resources :confirmations, only: [:show], path: 'confirmation'
        end

        resources :yarns, module: 'yarns'
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
