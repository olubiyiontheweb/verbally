# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '^(.*\.|)verbally\.com$', '127.0.0.1:8100', 'localhost:8100'
    resource '/api/v1/', headers: %w[Authorization], expose: %w[Authorization],
                         credentials: true, methods: %i[get patch put delete post options]
  end
end
