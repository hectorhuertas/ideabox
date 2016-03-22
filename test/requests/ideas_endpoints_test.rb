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
    post "/api/v1/ideas?title=title&body=body"

    idea = Idea.last
    assert_equal "title", idea.title
    assert_equal "body",  idea.body
  end

  test "delete an idea" do
    idea = Idea.create()

    delete "/api/v1/ideas/#{idea.id}"

    assert_equal 0, Idea.count
  end
end