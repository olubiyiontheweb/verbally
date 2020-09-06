class Api::V1::SessionsController < Devise::SessionsController
  wrap_parameters User

  def create
    # sign user, check valid password and email details
    user = User.new(usercred_params)
    if User.find_by_email(user.email).present?
      userdet = User.find_by_email(user.email)
      if userdet.valid_password?(user.password)
        sign_in(:user, userdet)
        render json: {
          messages: 'User signedin successfully',
          is_success: true,
          data: { user: user }
        }, status: :ok
      else
        render json: {
          messages: 'email or password incorrect, signin Failed',
          is_success: false,
          data: { user: user.errors.full_messages }
        }, status: :unprocessable_entity
      end
    else
      render json: {
        messages: 'email or password incorrect, signin Failed',
        is_success: false,
        data: { user: user.errors.full_messages }
      }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.new(usercred_params)
    sign_out(userdet) if User.find_by_email(user.email).present? && user.signed_in?
  end

  private

  def usercred_params
    params.require(:user).permit(:email, :user, :password)
  end
end
