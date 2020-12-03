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

  def show
    # get user by confirmation token and confirm
    user = User.new(confirmation_params)
    user = User.find_by_confirmation_token(user.confirmation_token)
    if user.blank?
      validation_error(user, 'Invalid or expired confirmation token submitted, account confirmation Failed')
    elsif user.confirmed?
      validation_error(user, 'User has already been confirmed')
    else
      user.confirm
      render_resource(user, 'Your account has been confirmed Successfully')
    end
  end

  def create
    user = User.find(params[:id])
    validate_token(user)
    User.find(params[:id]).resend_confirmation_instructions
  end

  private

  def confirmation_params
    params.require(:user).permit(:id, :confirmation_token)
  end
end
