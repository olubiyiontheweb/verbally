class Api::V1::Accounts::ConfirmationsController < ApplicationController
  wrap_parameters Account

  # before_action :ensure_params_exist

  # def show
  #   account = Account.new(accountconf_params)
  #   account = Account.find_by_confirmation_token(account.confirmation_token)
  #   if account.confirmed?
  #     render json: {
  #       messages: 'This account is confirmed',
  #       is_success: true,
  #       data: { account: account }
  #     }, status: :ok
  #   end
  # end

  def show
    # get account by confirmation token and confirm
    # account = Account.new(confirmation_params)
    account = Account.find_by_confirmation_token(params[:id])
    # account = Account.find_by_confirmation_token(account.confirmation_token)
    if account.blank?
      validation_error(account, 'Invalid or expired confirmation token submitted, account confirmation Failed')
    elsif account.confirmed?
      validation_error(account, 'Account has already been confirmed')
    else
      account.confirm
      render_resource(account, 'Your account has been confirmed Successfully')
    end
  end

  def create
    account = Account.find(params[:id])
    validate_token(account)
    Account.find(params[:id]).resend_confirmation_instructions
  end

  private

  def confirmation_params
    params.require(:account).permit(:id)
  end
end
