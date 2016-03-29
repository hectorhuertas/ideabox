require 'test_helper'

class TagTest < ActiveSupport::TestCase
  test "tags has many ideas" do
    tag = Tag.create(name: 'tag')

    idea_1 = Idea.create(title: "title", body: "body", tags: [tag])
    idea_2 = Idea.create(title: "title", body: "body", tags: [tag])

    assert_equal [idea_1,idea_2], tag.ideas
  end
end
