require 'test_helper'

class IdeasEndpointTest < ActionDispatch::IntegrationTest
  def json
    JSON.parse(response.body)
  end

  def create_ideas(n)
    ideas = []
    n.times { ideas << Idea.create() } && ideas
  end

  test "get ideas by most recent" do
    idea_1, idea_2, idea_3 = create_ideas(3)
    idea_2.update(title: 'bob')

    get "/api/v1/ideas"

    assert_equal idea_2.id, json[0]['id']
    assert_equal idea_3.id, json[1]['id']
    assert_equal idea_1.id, json[2]['id']
  end

  test "ideas have the correct format" do
    idea = Idea.create(title: "title", body: "body")

    get "/api/v1/ideas"

    assert_equal idea.title,   json[0]['title']
    assert_equal idea.body,    json[0]['body']
    assert_equal idea.quality, json[0]['quality']
  end

  test "post an idea" do
    skip
    tags = ['app', 'otra'].to_json
    post "/api/v1/ideas?title=title&body=body&tags=#{tags}"

    idea = Idea.last
    assert_equal "title", idea.title
    assert_equal "body",  idea.body
  end

  test "delete an idea" do
    idea = Idea.create()

    delete "/api/v1/ideas/#{idea.id}"

    assert_equal 0, Idea.count
  end

  test "upvote a swill idea" do
    idea = Idea.create()

    patch "/api/v1/ideas/#{idea.id}/upvote"

    assert_equal 'plausible', idea.reload.quality
  end

  test "upvote a plausible idea" do
    idea = Idea.create(quality: 1)

    patch "/api/v1/ideas/#{idea.id}/upvote"

    assert_equal 'genius', idea.reload.quality
  end

  test "upvote a genius idea does nothing" do
    idea = Idea.create(quality: 2)

    patch "/api/v1/ideas/#{idea.id}/upvote"

    assert_equal 'genius', idea.reload.quality
  end

  test "downvote a swill idea does nothing" do
    idea = Idea.create()

    patch "/api/v1/ideas/#{idea.id}/downvote"

    assert_equal 'swill', idea.reload.quality
  end

  test "downvote a plausible idea" do
    idea = Idea.create(quality: 1)

    patch "/api/v1/ideas/#{idea.id}/downvote"

    assert_equal 'swill', idea.reload.quality
  end

  test "downvote a genius idea" do
    idea = Idea.create(quality: 2)

    patch "/api/v1/ideas/#{idea.id}/downvote"

    assert_equal 'plausible', idea.reload.quality
  end

  test "update an idea" do
    idea = Idea.create()

    patch "/api/v1/ideas/#{idea.id}?title=title&body=body"

    assert_equal "title", idea.reload.title
    assert_equal "body",  idea.reload.body
  end
end
