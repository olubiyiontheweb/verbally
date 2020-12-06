class Api::V1::Accounts::AccountsController < ApplicationController
  # confirm user is authenticated before showing user details
  # before_action :authenticate_user!
  respond_to :json

  def index
    # show only active accounts
    @account = Account.where('deleted_at.null': true).all
    render json: @account
  end

  def show
    # search users by username
    @account = Account.where(username: params[:id])
    render json: @account
  end
end
