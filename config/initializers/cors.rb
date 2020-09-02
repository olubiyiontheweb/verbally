# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '^(.*\.|)verbally\.com$', '127.0.0.1:8100', 'localhost:8100'
      resource '*', headers: :any, credentials: true, methods: [:get, :patch, :put, :delete, :post, :options]
    end
end