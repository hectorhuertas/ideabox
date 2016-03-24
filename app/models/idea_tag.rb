class IdeaTag < ActiveRecord::Base
  belongs_to :idea
  belongs_to :tag

  after_destroy :bob

  def bob
    tag = self.tag
    tag.destroy if tag.ideas.count == 0
  end
end
