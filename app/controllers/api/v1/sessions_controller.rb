class Api::V1::SessionsController < Devise::SessionsController
  wrap_parameters User

  before_action :ensure_params_exist

  def create
    # sign user, check valid password and email details
    user = User.new(sign_in_params)

    if User.find_by_email(user.email).present?
      @userdet = User.find_by_email(user.email) 
    elsif User.find_by_username(user.email).present?
      @userdet = User.find_by_username(user.email)
    end

    if @userdet.present? && @userdet.valid_password?(user.password)
      sign_in @userdet, event: :authentication
      generate_token(@userdet)
      render_resource(@userdet, 'User signedin successfully')
    else
      validation_error(user, 'email or password incorrect, signin failed')
    end
  end

  def destroy
    if User.find_by_email(params[:email]).present?
      user = User.find_by_email(params[:email])
      validate_token(user)
      delete_token(user)
    end
  end

  private

  # user can pass username or email in email field
  def sign_in_params
    params.require(:user).permit(:password, :email)
  end

  # this is invoked before destroy and we have to override it
  def verify_signed_out_user; end
end
