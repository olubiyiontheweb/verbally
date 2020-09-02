require 'dynamoid'

Dynamoid.configure do |config|
  config.access_key = ENV.fetch('aws_access_key_id')
  config.secret_key = ENV.fetch('aws_secret_access_key')
  config.region = ENV.fetch('aws_dynamodb_region')
  config.endpoint = ENV.fetch('aws_dynamodb_endpoint') unless Rails.env.production?
  config.namespace = ENV.fetch('aws_dynamoid_namespace') # for tagging tables created by Dynamoid ORM
end
