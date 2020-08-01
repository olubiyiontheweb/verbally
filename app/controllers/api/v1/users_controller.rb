class Api::V1::UsersController < ApplicationController
  # confirm user is authenticated before showing user details
  # before_action :authenticate_user!

  def show
    @user = User.find(params[:user_id])
    render json: @user
  end
end
