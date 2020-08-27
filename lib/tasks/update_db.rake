desc 'Update AWS Dynamodb database tables with new migrations!'
task :update_dynamodb do
  require 'dynamodb/migration'

  options = {
    client: dynamodb_client, # an Aws::DynamoDB::Client instance
    path: '/db/migrations', # the full path to the folder migration classes will live
    migration_table_name: 'migrations' # optional, the name of the table to use for migrations, default is "migrations"
  }
  DynamoDB::Migration.run_all_migrations(options)
  puts 'Migration Completed'
end
