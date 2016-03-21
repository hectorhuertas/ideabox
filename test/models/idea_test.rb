require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  test "Idea quality defaults to 'swill'" do
    idea = Idea.create()

    assert_equal 'swill', idea.quality
  end
end
