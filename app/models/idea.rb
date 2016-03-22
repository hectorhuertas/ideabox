class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)

  scope :by_recently_updated, -> {order("updated_at desc")}

  def upvote
    (self['quality'] += 1) && save unless quality == 'genius'
  end
end
