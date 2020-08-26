class ApplicationController < ActionController::API
  # API ony application controller

  # protect against mass asignment attack during app interactions
  before_action :configure_permitted_parameters, if: :devise_controller?

  def status
    render json: { data: 'ok' }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name password password_confirmation
                                                         email username date_of_birth accept_terms_condition])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[first_name last_name bio])
    devise_parameter_sanitizer.permit(:sign_in) do |user_params|
      # user can login by providing username or email address
      user_params.permit(:username, :email)
    end
  end
end
