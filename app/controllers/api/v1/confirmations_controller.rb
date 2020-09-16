class Api::V1::ConfirmationsController < Devise::ConfirmationsController
  wrap_parameters User

  before_action :ensure_params_exist

  # def show
  #   user = User.new(userconf_params)
  #   user = User.find_by_confirmation_token(user.confirmation_token)
  #   if user.confirmed?
  #     render json: {
  #       messages: 'This account is confirmed',
  #       is_success: true,
  #       data: { user: user }
  #     }, status: :ok
  #   end
  # end

  # def create
  #   # get user by confirmation token and confirm
  #   user = User.new(userconf_params)
  #   user = User.find_by_confirmation_token(user.confirmation_token)
  #   if user.blank? || user.confirmed?
  #     render json: {
  #       messages: 'Invalid or expired confirmation token submitted, account confirmation Failed',
  #       is_success: false,
  #       data: { user: user.errors.full_messages }
  #     }, status: :unprocessable_entity
  #   else
  #     user.confirm
  #     render json: {
  #       messages: 'Your account has been confirmed Successfully',
  #       is_success: true,
  #       data: { user: user }
  #     }, status: :ok
  #   end
  # end

  private

  # def userconf_params
  #   params.require(:user).permit(:confirmation_token)
  # end

  def confirmation_params
    params.require(:user).permit(:confirmation_token)
  end
end
