require_relative 'boot'

# require 'rails/all'  commented because the app does not use active record

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
# require "active_record/railtie"
# require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
# require "sprockets/railtie"
require 'rails/test_unit/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Verbally
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # App wide API only configuration
    config.api_only = true

    config.filter_parameters += %i[password token jti]

    config.middleware.delete ActionDispatch::Session::CookieStore

    config.generators do |g|
      g.orm :dynamoid
    end

    ## load subdirectories of model, mailer, jobs folders
    config.autoload_paths += Dir[Rails.root.join('app', 'jobs', '**/')]
    config.autoload_paths += Dir[Rails.root.join('app', 'models', '**/')]
    config.autoload_paths += Dir[Rails.root.join('app', 'mailers', '**/')]

    # config.middleware.insert_before 0, Rack::Cors do
    #   allow do
    #     origins '^(.*\.|)verbally\.com$', '127.0.0.1', 'localhost'
    #     resource(
    #       '*',
    #       headers: :any,
    #       methods: [:get, :patch, :put, :delete, :post, :options]
    #       )
    #   end
    # end
  end
end
