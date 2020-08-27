class Api::V1::RegistrationsController < Devise::RegistrationsController
  wrap_parameters User
  before_action :ensure_params_exist, only: :create

  def create
    user = User.new(user_params)
    # User.error.add('Username exists in database') unless User.exists?(username: params[:username])
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
end
