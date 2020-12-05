class Api::V1::Yarns::YarnsController < ApplicationController
  skip_before_action :authenticate_user!, only: :active_account
end
