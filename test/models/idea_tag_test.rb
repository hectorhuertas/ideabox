require 'test_helper'

class IdeaTagTest < ActiveSupport::TestCase
  test "tags without ideas get deleted" do
    tag = Tag.create()
    idea = Idea.create(tags: [tag])

    Idea.last.destroy

    assert_equal 0, Tag.count
  end
end
