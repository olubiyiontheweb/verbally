class Api::V1::SessionsController < Devise::SessionsController
  wrap_parameters User

  before_action :ensure_params_exist

  def create
    # sign user, check valid password and email details
    user = User.new(sign_in_params)
    @userdet = User.find_by_email(user.email) if User.find_by_email(user.email).present?
    if @userdet.present? && @userdet.valid_password?(user.password)
      # userdet = User.find_by_email(user.email)
      # if userdet.valid_password?(user.password)
      sign_in @userdet, event: :authentication
      generate_token(@userdet)
      # response.set_header('Authorization', 'HEADER VALUE')
      render json: {
        messages: 'User signedin successfully',
        is_success: true,
        data: { user: @userdet }
      }, status: :ok
    else
      render json: {
        messages: 'email or password incorrect, signin failed',
        is_success: false,
        data: { user: user.errors.full_messages }
      }, status: :unprocessable_entity
    end
  end

  # def create
  #   # sign user, check valid password and email details
  #   user = User.new(sign_in_params)
  #   if User.find_by_email(user.email).present?
  #     userdet = User.find_by_email(user.email)
  #     if userdet.valid_password?(user.password)
  #       user = sign_in(:user, userdet)
  #       token = Tiddle.create_and_return_token(user, request)
  #       render json: {
  #         authentication_token: token,
  #         messages: 'User signedin successfully',
  #         is_success: true,
  #         data: { user: user }
  #       }, status: :ok
  #     else
  #       render json: {
  #         messages: 'email or password incorrect, signin Failed',
  #         is_success: false,
  #         data: { user: user.errors.full_messages }
  #       }, status: :unprocessable_entity
  #     end
  #   else
  #     render json: {
  #       messages: 'email or password incorrect, signin Failed',
  #       is_success: false,
  #       data: { user: user.errors.full_messages }
  #     }, status: :unprocessable_entity
  #   end
  # end

  def destroy
    user = User.new(sign_in_params)
    if User.find_by_email(user.email).present?
      user = User.find_by_email(user.email)
      sign_out(userdet) if user.signed_in?
    end
  end

  private

  # def usercred_params
  #   params.require(:user).permit(:email, :password)
  # end

  def sign_in_params
    params.require(:user).permit(:password, :email)
  end

  # this is invoked before destroy and we have to override it
  def verify_signed_out_user; end
end
