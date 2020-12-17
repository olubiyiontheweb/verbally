class Api::V1::Yarns::YarnsController < ApplicationController
  # run functions only if account is currently loggedin
  # before_action :validate_user_request_token

  def index
    # get yarns
    yarn_list = Yarn.where(visible: 'true').all

    yarns = []

    # loop through yarn attributes
    yarn_list.each do |y|
      yarn = {}
      yarn_content = find_yarn_content(y[:id])
      y_content = []
      # loop through yarn content atrributes
      yarn_content.each do |yc|
        c = {}
        c[:content_id] = yc[:id]
        c[:yarn_id] = yc[:yarn_id]
        c[:yarn_text] = yc[:yarn_text]
        c[:has_voice_over] = yc[:has_voice_over]
        c[:has_video] = yc[:has_video]
        y_content << c
      end
      yarn[:id] = y[:id]
      yarn[:account_id] = y[:account_id]
      yarn[:privacy_status] = y[:privacy_status]
      yarn[:content] = y_content[0]
      yarns << yarn
    end

    render json: yarns
  end

  def show
    yarn = Yarn.find(params[:id])
    render json: {
      yarn: yarn,
      is_success: true,
      contents: YarnContent.where(yarn_id: params[:id])
    }, status: :ok
  end

  def create
    account, pub_token = validate_user_request_token
    yarn = Yarn.new(yarn_params)
    yarn.account_id = account.id
    yarn_content = YarnContent.new(yarn_params[:yarn_contents_attributes])
    puts 'Here is yarn owner' + yarn.account_id.to_s
    if yarn.save
      yarn_content.yarn_id = yarn.id
      puts 'Here we are' + yarn_content.to_s
      if yarn_content.save
        render json: {
          yarn: yarn,
          is_success: true,
          contents: yarn_content,
          authorization: pub_token
        }, status: :ok
      end
    else
      validation_error(account, 'Please try again another time, didnt go through')
    end
  end

  def update; end

  def destroy
    yarn = Yarn.find(params[:id])
    yarn.soft_delete
  end

  private

  def yarn_params
    params.require(:yarn).permit(:account_id, :privacy_status, :visible, yarn_contents_attributes: %i[yarn_id yarn_text])
  end

  def find_yarn_content(yarn_id)
    YarnContent.where(yarn_id: yarn_id)
  end

  def find_yarn_replies(yarn_id)
    YarnReply.where(yarn_id: yarn_id)
  end

  def find_yarn_likes(yarn_id)
    YarnLike.where(yarn_id: yarn_id)
  end
end
