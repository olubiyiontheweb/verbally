class ApplicationController < ActionController::API
  # API ony application controller

  # protect against mass asignment attack during app interactions

  respond_to :html, :json
  before_action :configure_permitted_parameters, if: :devise_controller?
  # before_action :authenticate_user!

  def status
    render json: { data: 'ok' }
  end

  private

  def ensure_params_exist
    return if params[:user].present?

    render json: {
      messages: 'Missing Params',
      is_success: false,
      data: {}
    }, status: :bad_request
  end

  def check_unique_values
    user_det = User.new(user_params)
    # return unless User.where(email: user_det.username).present? || User.where(email: user_det.email).present?
    return unless User.find_by_username(user_det.username).present? || User.find_by_email(user_det.email).present?

    user_det.errors.add(:base, :username_or_email_exists, message: 'Some parameters (e.g username or email) exists in the database')
    render json: {
      messages: 'Some parameters (e.g username or email) exists in the database',
      is_success: false,
      data: {}
    }, status: :bad_request
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name password password_confirmation
                                                         email username date_of_birth accept_terms_condition])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[first_name last_name bio])
    devise_parameter_sanitizer.permit(:sign_in) do |user_params|
      # user can login by providing username or email address
      user_params.permit(:username, :email)
    end
  end
end
