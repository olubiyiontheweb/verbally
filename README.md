# Verbally

A productivity tool that helps creators and marketers create audio voice overs, ads or stories in their native or preferred voice.




### To setup this app on your local system

Install Ruby 2.7.0

You can follow this guide to use RVM 

> https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rvm-on-ubuntu-18-04

After successfully installing ruby type these commands

> git clone https://github.com/querldox5/verbally.git

> cd verbally

> gem install bundler

> bundle install

To start the server type

> rails s

It's live at http://localhost:3000

Here are currently available API V1 routes

| Prefix Verb                         | URI Pattern                              | Controller#Action                             |
| ----------------------------------- | ---------------------------------------- | --------------------------------------------- |
| new_api_v1_user_session GET         | /api/v1/users/sign_in(.:format)          | api/v1/sessions#new {:format=>:json}          |
| api_v1_user_session POST            | /api/v1/users/sign_in(.:format)          | api/v1/sessions#create {:format=>:json}       |
| destroy_api_v1_user_session DELETE  | /api/v1/users/sign_out(.:format)         | api/v1/sessions#destroy {:format=>:json}      |
| new_api_v1_user_password GET        | /api/v1/users/password/new(.:format)     | api/v1/passwords#new {:format=>:json}         |
| edit_api_v1_user_password GET       | /api/v1/users/password/edit(.:format)    | api/v1/passwords#edit {:format=>:json}        |
| api_v1_user_password PATCH          | /api/v1/users/password(.:format)         | api/v1/passwords#update {:format=>:json}      |
| PUT                                 | /api/v1/users/password(.:format)         | api/v1/passwords#update {:format=>:json}      |
| POST                                | /api/v1/users/password(.:format)         | api/v1/passwords#create {:format=>:json}      |
| cancel_api_v1_user_registration GET | /api/v1/users/cancel(.:format)           | api/v1/registrations#cancel {:format=>:json}  |
| new_api_v1_user_registration GET    | /api/v1/users/sign_up(.:format)          | api/v1/registrations#new {:format=>:json}     |
| edit_api_v1_user_registration GET   | /api/v1/users/edit(.:format)             | api/v1/registrations#edit {:format=>:json}    |
| api_v1_user_registration PATCH      | /api/v1/users(.:format)                  | api/v1/registrations#update {:format=>:json}  |
| PUT                                 | /api/v1/users(.:format)                  | api/v1/registrations#update {:format=>:json}  |
| DELETE                              | /api/v1/users(.:format)                  | api/v1/registrations#destroy {:format=>:json} |
| POST                                | /api/v1/users(.:format)                  | api/v1/registrations#create {:format=>:json}  |
| new_api_v1_user_confirmation GET    | /api/v1/users/confirmation/new(.:format) | api/v1/confirmations#new {:format=>:json}     |
| api_v1_user_confirmation GET        | /api/v1/users/confirmation(.:format)     | api/v1/confirmations#show {:format=>:json}    |
| POST                                | /api/v1/users/confirmation(.:format)     | api/v1/confirmations#create {:format=>:json}  |
| new_api_v1_user_unlock GET          | /api/v1/users/unlock/new(.:format)       | api/v1/unlocks#new {:format=>:json}           |
| api_v1_user_unlock GET              | /api/v1/users/unlock(.:format)           | api/v1/unlocks#show {:format=>:json}          |
| POST                                | /api/v1/users/unlock(.:format)           | api/v1/unlocks#create {:format=>:json}        |
| api_v1_user GET                     | /api/v1/users/:id(.:format)              | api/v1/users#show {:format=>:json}            |
