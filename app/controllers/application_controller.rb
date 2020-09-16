class ApplicationController < ActionController::API
  # API ony application controller

  # protect against mass asignment attack during app interactions

  respond_to :json
  # before_action :authenticate_user!

  def status
    render json: { data: 'ok' }
  end

  private

  def ensure_params_exist
    return if params[:user].present?

    render json: {
      messages: 'Missing Params',
      is_success: false,
      data: {}
    }, status: :bad_request
  end

  def generate_token(user)
    # response.set_header('authtoken', 'HEADER VALUE')
    # ffff
    token = Digest::SHA1.hexdigest(ENV.fetch('auth_token_key') + user.id + Time.now.to_s)
    response.set_header('Authorization', ' Bearer ' + token)
    priv_token = Digest::SHA1.hexdigest token
    authtoken = AuthenticationToken.new(user_id: user.id, token: priv_token, expires_in: 30)
    authtoken.save
  end

  def validate_token(user)
    # token
    pub_token = request.headers['Authorization']
    priv_token = Digest::SHA1.hexdigest pub_token
    @token = AuthenticationToken.find_by_token(priv_token) if AuthenticationToken.find_by_token(priv_token).present?
    if @token.present? && @token.user_id == user.id
      # update last used at
      @token.update_attributes(last_used_at: Time.now.to_s)
    else
      # validation_error(user)
      render json: {
        messages: 'Invalid Authorization token, sign in failed',
        is_success: false,
        data: { user: user.errors.full_messages }
      }, status: :unprocessable_entity
    end
  end

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end
end
