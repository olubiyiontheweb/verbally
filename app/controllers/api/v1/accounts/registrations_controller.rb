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
    account = Account.find(params[:id])
    validate_token(account)
    account.soft_delete
    delete_token(account)
    # set_flash_message :notice, :destroyed
  end

  private

  def check_unique_values
    account_det = Account.new(sign_up_params)
    # return unless Account.where(email: account_det.accountname).present? || Account.where(email: account_det.email).present?
    unless Account.find_by_accountname(account_det.accountname).present? || Account.find_by_email(account_det.email).present?
      return
    end

    # account_det.errors.add(:base, :accountname_or_email_exists, message: 'Some parameters (e.g accountname or email) exists in the database')
    validation_error(account_det, 'Some parameters (e.g accountname or email) exists in the database')
  end

  def sign_up_params
    params.require(:account).permit(:id, :email, :password, :password_confirmation, :accountname, :first_name, :last_name,
                                    :date_of_birth, :accept_terms_condition)
  end
end
