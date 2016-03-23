class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    respond_with Idea.by_recently_updated
  end

  def create
    idea = Idea.create(idea_params)
    render json: idea
  end

  def update
    idea = Idea.update(params[:id],idea_params)
    render json: idea
  end

  def destroy
    Idea.find(params[:id]).destroy
    render json: {message:"done"}
  end

  def upvote
    Idea.find(params[:idea_id]).upvote
    render json: {message:"done"}
  end

  def downvote
    Idea.find(params[:idea_id]).downvote
    render json: {message:"done"}
  end

  private
    def idea_params
      {title: params[:title], body: params[:body], tags: tags}
    end

    def tags
      params[:tags].map{|tag| Tag.find_or_create_by(name: tag)}
    end
end
