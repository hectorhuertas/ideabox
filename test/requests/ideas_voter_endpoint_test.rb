require 'test_helper'

class IdeasVoterEnpointTest < ActionDispatch::IntegrationTest
  def json
    JSON.parse(response.body)
  end

  test "upvote idea" do
    idea = Idea.create(title: "title", body: "body")

    patch "/api/v1/ideas/#{idea.id}/vote?vote=upvote"

    assert_equal 'plausible', Idea.last.quality
  end

  test "downvote idea" do
    idea = Idea.create(title: "title", body: "body", quality: 2)

    patch "/api/v1/ideas/#{idea.id}/vote?vote=downvote"

    assert_equal 'plausible', Idea.last.quality
  end
end
