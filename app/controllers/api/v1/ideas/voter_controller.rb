class Api::V1::Ideas::VoterController < Api::ApiController
  respond_to :json

  def update
    respond_with :api, :v1, Idea.find(params[:idea_id]).send(params[:vote])
  end
end
