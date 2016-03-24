require 'test_helper'

class IdeasEndpointTest < ActionDispatch::IntegrationTest
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

  test "post an idea without tags" do
    idea_data = {"title"=>"title", "body"=>"body"}

    post "/api/v1/ideas", {"idea"=> idea_data}

    idea = Idea.last
    assert_equal "title", idea.title
    assert_equal "body",  idea.body
  end

  test "post an idea with tags" do
    idea_data = {"title"=>"title", "body"=>"body", "tags"=>["app", "other"]}

    post "/api/v1/ideas", {"idea"=> idea_data}

    idea = Idea.last
    assert_equal "title", idea.title
    assert_equal "body",  idea.body
    assert_equal %w(app other),  idea.tags.pluck(:name)
  end

  test "delete an idea" do
    idea = Idea.create()

    delete "/api/v1/ideas/#{idea.id}"

    assert_equal 0, Idea.count
  end

  test "update an idea without tags" do
    idea_data = {"title"=>"title", "body"=>"body"}
    idea = Idea.create()

    patch "/api/v1/ideas/#{idea.id}", {"idea"=> idea_data}

    assert_equal "title", idea.reload.title
    assert_equal "body",  idea.reload.body
  end

  test "update an idea with tags" do
    idea_data = {"title"=>"title", "body"=>"body", "tags"=>["app", "other"]}
    idea = Idea.create()

    patch "/api/v1/ideas/#{idea.id}", {"idea"=> idea_data}

    assert_equal "title", idea.reload.title
    assert_equal "body",  idea.reload.body
  end
end
