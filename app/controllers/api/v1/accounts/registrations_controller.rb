class Api::V1::Accounts::RegistrationsController < Devise::RegistrationsController
  wrap_parameters Account
  before_action :ensure_params_exist
  before_action :check_unique_values, only: :create

  def create
    account = Account.new(sign_up_params)
    if account.save
      generate_token(account)
      render_resource(account, 'Sign Up Successfully')
    else
      validation_error(account, 'Empty parameter submitted, Sign Up Failed')
    end
  end

  # DELETE /resource
  def cancel
    account = Account.new(sign_up_params)
    token_response = {}
    unless account.email.blank? && account.username.blank?
      account = Account.find_by_username(account.username) || Account.find_by_email(account.email)
      token_response = validate_token(account)
      unless token_response[:is_success] == 'false'
        token_response.merge!(delete_token(account))
        account.soft_delete
      end
    end
    token_response.merge!(token_response)
    render token_response
  end

  private

  def check_unique_values
    account_det = Account.new(sign_up_params)
    # return unless Account.where(email: account_det.username).present? || Account.where(email: account_det.email).present?
    unless account_det.username.blank? || account_det.email.blank?
      unless Account.find_by_username(account_det.username).present? || Account.find_by_email(account_det.email).present?
        return
      end
    end

    # account_det.errors.add(:base, :username_or_email_exists, message: 'Some parameters (e.g username or email) exists in the database')
    validation_error(account_det, 'Some parameters (e.g username or email) exists in the database')
  end

  def sign_up_params
    params.require(:account).permit(:id, :email, :password, :password_confirmation, :username, :first_name, :last_name,
                                    :date_of_birth, :accept_terms_condition)
  end
end
