# # /config/initializers/dynamodb_connect.rb
# module DynamodbConnect
#   def self.initialize!
#     dbconnect_config = {
#       endpoint: ENV.fetch('aws_dynamodb_endpoint'),
#       access_key_id: ENV.fetch('aws_access_key_id'),
#       secret_access_key: ENV.fetch('aws_secret_access_key'),
#       region: ENV.fetch('aws_dynamodb_region')
#     }

#     @@client ||= Aws::DynamoDB::Client.new(dbconnect_config)
#   end

#     module_function

#   def client
#     @@client
#   end
#   end
