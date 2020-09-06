class Api::V1::RegistrationsController < Devise::RegistrationsController
  wrap_parameters User
  before_action :ensure_params_exist, :check_unique_values, only: :create

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

  # DELETE /resource
  def destroy
    resource.soft_delete
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message :notice, :destroyed
    yield resource if block_given?
    respond_with_navigational(resource) { redirect_to after_sign_out_path_for(resource_name) }
  end

  private

  def user_params
    # configuring permitted attributes
    params.require(:user).permit(:email, :password, :password_confirmation, :username, :first_name, :last_name,
                                 :date_of_birth, :accept_terms_condition)
  end
end
