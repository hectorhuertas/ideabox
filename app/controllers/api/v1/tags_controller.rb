class Api::V1::TagsController < Api::ApiController
  respond_to :json

  def index
    respond_with Tag.all
  end
end
