class Api::V1::RegistrationsController < Devise::RegistrationsController
  wrap_parameters User
  before_action :ensure_params_exist
  before_action :check_unique_values, only: :create

  def create
    user = User.new(sign_up_params)
    if user.save
      generate_token(user)

      render_resource(user, 'Sign Up Successfully')
    else
      validation_error(user, 'Empty parameter submitted, Sign Up Failed')
    end
  end

  # DELETE /resource
  def cancel
    user = User.find(params[:id])
    validate_token(user)
    user.soft_delete
    delete_token(user)
    # set_flash_message :notice, :destroyed
  end

  private

  def check_unique_values
    user_det = User.new(sign_up_params)
    # return unless User.where(email: user_det.username).present? || User.where(email: user_det.email).present?
    return unless User.find_by_username(user_det.username).present? || User.find_by_email(user_det.email).present?

    # user_det.errors.add(:base, :username_or_email_exists, message: 'Some parameters (e.g username or email) exists in the database')
    validation_error(user_det, 'Some parameters (e.g username or email) exists in the database')
  end

  def sign_up_params
    params.require(:user).permit(:id, :email, :password, :password_confirmation, :username, :first_name, :last_name,
                                 :date_of_birth, :accept_terms_condition)
  end
end
