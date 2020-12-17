class ApplicationController < ActionController::API
  # API ony application controller

  # hostnames adapts to request link
  # before_filter :make_action_mailer_use_request_host_and_protocol

  # protect against mass asignment attack during app interactions

  respond_to :json
  # before_action :authenticate_account!

  private

  def ensure_params_exist
    return if params[:account].present?

    render json: {
      messages: 'Missing Params',
      is_success: false,
      data: {}
    }, status: :bad_request
  end

  def generate_token(account)
    # response.set_header('authtoken', 'HEADER VALUE')
    token = Digest::SHA1.hexdigest(ENV.fetch('auth_token_key') + account.id + Time.now.to_s)
    response.set_header('Authorization', ' Bearer ' + token)
    priv_token = Digest::SHA1.hexdigest token
    authtoken = AuthenticationToken.new(account_id: account.id, token: priv_token, expires_in: 30)
    authtoken.save
    token
  end

  def validate_token(account)
    # token
    if request.headers['Authorization'].blank?
      token_validation_response(account, 'Unauthorized access, no token provided', 'false')
    else
      pub_token = request.headers['Authorization']
      priv_token = Digest::SHA1.hexdigest pub_token
      @token = AuthenticationToken.find_by_token(priv_token) if AuthenticationToken.find_by_token(priv_token).present?
      # puts priv_token
      if @token.present? && @token.account_id == account.id && account.active_for_authentication?
        # check if token has expired for new token
        if (Date.today - @token.created_at).to_i >= @token.expires_in
          @token.delete
          pub_token = generate_token(account)
        end
        # update last used at
        @token.update_attributes(last_used_at: Time.now.to_s)
        token_validation_response(account, 'Token validated', 'true', pub_token)
      else
        token_validation_response(account, 'Invalid authorization token, authentication failed!', 'false')
      end
    end
  end

  def delete_token(account)
    if request.headers['Authorization'].blank?
      token_validation_response(account, 'Unauthorized access, no token provided', 'false')
    else
      pub_token = request.headers['Authorization']
      priv_token = Digest::SHA1.hexdigest pub_token
      @token = AuthenticationToken.find_by_token(priv_token) if AuthenticationToken.find_by_token(priv_token).present?
      if @token.present? && @token.account_id == account.id && account.active_for_authentication?
        @token.delete
        token_validation_response(account, 'Token deleted successfully', 'true')
      else
        token_validation_response(account, 'Token does not exist, User already signed out', 'false')
      end
    end
  end

  # show success reponse
  def render_resource(resource, message, token)
    if resource.errors.empty?
      token = "" if token.blank?
      render json: {
        messages: message,
        is_success: true,
        data: resource,
        authorization: token
      }, status: :ok
    else
      validation_error(resource, message)
    end
  end

  # show error response
  def validation_error(resource, message)
    if message.present?
      unless resource.blank?
        resource.errors.add(:base, message: message)
        message = resource.errors.full_messages
        message = message[0][:message]
      end
      render json: {
        messages: message,
        is_success: false,
        data: message
      }, status: :unprocessable_entity
    end
  end

  # show error response
  def token_validation_response(resource, message, status, token)
    if message.present?
      unless resource.blank?
        resource.errors.add(:base, message: message)
        message = resource.errors.full_messages
      end

      token = "" if token.blank?
      { json: {
        messages: message,
        is_success: status,
        data: message,
        authorization: token
      }, status: :unprocessable_entity }
    end
  end

  # return token username
  def validate_user_request_token
    if request.headers['Authorization'].blank?
      token_validation_response(account, 'Unauthorized access, no token provided', 'false')
    else
      pub_token = request.headers['Authorization']
      priv_token = Digest::SHA1.hexdigest pub_token
      @token = AuthenticationToken.find_by_token(priv_token) if AuthenticationToken.find_by_token(priv_token).present?
      account = Account.find(@token.account_id)
      if @token.present? && account.present? && account.active_for_authentication?
        # check if token has expired for new token
        if (Date.today - @token.created_at).to_i >= @token.expires_in
          @token.delete
          pub_token = generate_token(account)
        end
        # update last used at
        @token.update_attributes(last_used_at: Time.now.to_s)
        return account, pub_token
      else
        token_validation_response(account, 'Invalid authorization token, authentication failed!', 'false')
      end
    end
  end

  # def make_action_mailer_use_request_host_and_protocol
  #   ActionMailer::Base.default_url_options[:protocol] = request.protocol
  #   ActionMailer::Base.default_url_options[:host] = request.host_with_port
  # end
end
