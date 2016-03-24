class IdeaTag < ActiveRecord::Base
  belongs_to :idea
  belongs_to :tag

  after_destroy :clear_unused

  def clear_unused
    self.tag.destroy if self.tag.ideas.count == 0
  end
end
