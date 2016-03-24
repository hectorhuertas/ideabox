class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    respond_with Idea.by_recently_updated
  end

  def create
    respond_with :api, :v1, Idea.create(TagLoader.for(idea_params))
  end

  def update
    respond_with Idea.update(params[:id],TagLoader.for(idea_params))
  end

  def destroy
    respond_with Idea.find(params[:id]).destroy
  end

  private
    def idea_params
      params.require(:idea).permit(:title, :body, tags: [])
    end
end
