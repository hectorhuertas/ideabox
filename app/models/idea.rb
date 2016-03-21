class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)

  scope :by_recently_updated, -> {order("updated_at desc")}
end
