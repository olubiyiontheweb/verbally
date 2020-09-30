class Api::V1::RegistrationsController < Devise::RegistrationsController
  wrap_parameters User
  before_action :ensure_params_exist
  before_action :check_unique_values, only: :create

  def create
    user = User.new(sign_up_params)
    if user.save
      generate_token(user)
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

  # DELETE /resource
  def destroy
    resource.soft_delete
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message :notice, :destroyed
    yield resource if block_given?
    respond_with_navigational(resource) { redirect_to after_sign_out_path_for(resource_name) }
  end

  private

  # def user_params
  #   # configuring permitted attributes
  #   params.require(:user).permit(:email, :password, :password_confirmation, :username, :first_name, :last_name,
  #                                :date_of_birth, :accept_terms_condition)
  # end

  def check_unique_values
    user_det = User.new(sign_up_params)
    # return unless User.where(email: user_det.username).present? || User.where(email: user_det.email).present?
    return unless User.find_by_username(user_det.username).present? || User.find_by_email(user_det.email).present?

    user_det.errors.add(:base, :username_or_email_exists, message: 'Some parameters (e.g username or email) exists in the database')
    render json: {
      messages: 'Some parameters (e.g username or email) exists in the database',
      is_success: false,
      data: {}
    }, status: :bad_request
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :username, :first_name, :last_name,
                                 :date_of_birth, :accept_terms_condition)
  end
end
