class Tag < ActiveRecord::Base
  has_many :idea_tags
  has_many :ideas, through: :idea_tags
end
