class Idea < ActiveRecord::Base
  has_many :idea_tags, dependent: :destroy
  has_many :tags, through: :idea_tags

  enum quality: %w(swill plausible genius)

  scope :by_recently_updated, -> {order("updated_at desc")}

  def upvote
    (self['quality'] += 1) && save unless quality == 'genius'
  end

  def downvote
    (self['quality'] -= 1) && save unless quality == 'swill'
  end
end
