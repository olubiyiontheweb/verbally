class Api::V1::UsersController < ApplicationController
  # confirm user is authenticated before showing user details
  # before_action :authenticate_user!
  respond_to :json

  def show
    # search users by username
    @user = User.where(username: params[:id])
    render json: @user
  end
end
