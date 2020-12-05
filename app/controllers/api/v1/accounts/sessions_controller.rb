class Api::V1::Accounts::SessionsController < Devise::SessionsController
  wrap_parameters Account

  before_action :ensure_params_exist

  def create
    # sign account, check valid password and email details
    account = Account.new(sign_in_params)

    if Account.find_by_email(account.email).present?
      @accountdet = Account.find_by_email(account.email)
    elsif Account.find_by_accountname(account.email).present?
      @accountdet = Account.find_by_accountname(account.email)
    end

    if @accountdet.present? && @accountdet.valid_password?(account.password)
      sign_in @accountdet, event: :authentication
      generate_token(@accountdet)
      render_resource(@accountdet, 'Account signedin successfully')
    else
      validation_error(account, 'email or password incorrect, signin failed')
    end
  end

  def destroy
    if Account.find_by_email(params[:email]).present?
      account = Account.find_by_email(params[:email])
      validate_token(account)
      delete_token(account)
    end
  end

  private

  # account can pass accountname or email in email field
  def sign_in_params
    params.require(:account).permit(:password, :email)
  end

  # this is invoked before destroy and we have to override it
  def verify_signed_out_account; end
end
