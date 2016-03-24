class Api::V1::IdeasController < Api::ApiController
  respond_to :json

  def index
    respond_with Idea.by_recently_updated
  end

  def create
    respond_with :api, :v1, Idea.create(idea_params)
  end

  def update
    respond_with Idea.update(params[:id],idea_params)
  end

  def destroy
    respond_with Idea.find(params[:id]).destroy
  end

  private
    def idea_params
      if params[:tags]
        {title: params[:title], body: params[:body], tags: tags}
      else
        {title: params[:title], body: params[:body]}
      end
    end

    def tags
      params[:tags].map{|tag| Tag.find_or_create_by(name: tag)}
    end
end
