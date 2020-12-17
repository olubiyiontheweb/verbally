class Api::V1::Accounts::SessionsController < ApplicationController
  wrap_parameters Account

  before_action :ensure_params_exist

  def create
    # sign account, check valid password and email details 
    account = Account.new(sign_in_params)

    if Account.find_by_email(account.email).present?
      @accountdet = Account.find_by_email(account.email)
    elsif Account.find_by_username(account.email).present?
      @accountdet = Account.find_by_username(account.email)
    end

    if @accountdet.present? && @accountdet.valid_password?(account.password) && @accountdet.active_for_authentication?
      sign_in @accountdet, event: :authentication
      token = generate_token(@accountdet)
      render_resource(@accountdet, 'Account signedin successfully', token)
    else
      validation_error(account, 'email or password incorrect, signin failed')
    end
  end

  def destroy
    account = Account.new(sign_in_params)
    token_response = {}

    unless account.email.blank?
      if Account.find_by_email(account.email).present?
        account = Account.find_by_email(account.email)
        token_response = validate_token(account)
        puts 'I am here' + token_response.to_s
        unless token_response[:is_success] == 'false' # sign_out(resource)
          sign_out account
          token_response.merge!(delete_token(account))
        end
      end
    end

    render token_response
  end

  private

  # account can pass username or email in email field
  def sign_in_params
    params.require(:account).permit(:password, :email)
  end
end
