class Idea < ActiveRecord::Base
  enum quality: %w(swill plausible genius)
end
