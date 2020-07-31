Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true
    config.action_controller.enable_fragment_cache_logging = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options).
  # config.active_storage.service = ENV.fetch('active_storage_service').to_sym

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  mail_delivery_method = (ENV.fetch('mail_delivery_method').present? ? ENV['mail_delivery_method'].to_sym : :sendmail)

  config.action_mailer.delivery_method = mail_delivery_method

  if mail_delivery_method == :smtp
    ActionMailer::Base.smtp_settings = {
      address: ENV.fetch('smtp_email_address'),
      port: ENV.fetch('smtp_email_port'),
      domain: ENV.fetch('smtp_email_domain'),
      user_name: ENV.fetch('smtp_email_user_name'),
      password: ENV.fetch('smtp_email_password'),
      authentication: 'plain',
      enable_starttls_auto: true
    }
  end

  # Sendmail is used for some mails (e.g. Newsletter) so configure it even when smtp is the main method
  ActionMailer::Base.sendmail_settings = {
    location: '/usr/sbin/sendmail',
    arguments: '-i -t'
  }

  ActionMailer::Base.perform_deliveries = true # the "deliver_*" methods are available

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  # config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  # config.active_record.verbose_query_logs = true

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  # config.assets.debug = true

  # Suppress logger output for asset requests.
  # config.assets.quiet = true

  # Raises error for missing translations.
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  # Api only configuration
  config.debug_exception_response_format = :default
end
