class IdeaSerializer < ActiveModel::Serializer
  # created_at and updated_at missing from the default
  attributes :id, :title, :body, :quality, :tags

  def tags
    object.tags.map(&:name)
  end
end
