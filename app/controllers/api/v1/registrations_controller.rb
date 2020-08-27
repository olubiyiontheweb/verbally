class Api::V1::RegistrationsController < Devise::RegistrationsController
  wrap_parameters User
  before_action :ensure_params_exist, only: :create
  before_action :check_unique_values

  def create
    user = User.new(user_params)
    if user.save
      render json: {
        messages: 'Sign Up Successfully',
        is_success: true,
        data: { user: user }
      }, status: :ok
    else
      render json: {
        messages: 'Empty parameter submitted, Sign Up Failed',
        is_success: false,
        data: { user: user.errors.full_messages }
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    # devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name password password_confirmation
    #                                                     email username date_of_birth accept_terms_condition])
    params.require(:user).permit(:email, :password, :password_confirmation, :username, :first_name,
                                 :date_of_birth, :accept_terms_condition)
  end

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
    return unless User.find_by_username(user_det.username).present? || User.find_by_email(user_det.email).present?

    user_det.errors.add(:base, :username_or_email_exists, message: 'Some parameters (e.g username or email) exists in the database')
    render json: {
      messages: 'Some parameters (e.g username or email) exists in the database',
      is_success: false,
      data: {}
    }, status: :bad_request
  end
end
