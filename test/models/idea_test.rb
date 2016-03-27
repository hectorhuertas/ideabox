require 'test_helper'

class IdeaTest < ActiveSupport::TestCase
  test "Idea must have a non empty title" do
    idea = Idea.create(title: "", body: "body")

    assert_equal 0, Idea.count
  end

  test "Idea must have a non empty body" do
    idea = Idea.create(title: "title", body: "")

    assert_equal 0, Idea.count
  end

  test "Idea quality defaults to 'swill'" do
    idea = Idea.create(title: "title", body: "body")

    assert_equal 'swill', idea.quality
  end

  test "upvote a swill idea" do
    idea = Idea.create(title: "title", body: "body")

    idea.upvote

    assert_equal 'plausible', idea.quality
  end

  test "upvote a plausible idea" do
    idea = Idea.create(title: "title", body: "body", quality: 1)

    idea.upvote

    assert_equal 'genius', idea.quality
  end

  test "upvote a genius idea does nothing" do
    idea = Idea.create(title: "title", body: "body", quality: 2)

    idea.upvote

    assert_equal 'genius', idea.quality
  end

  test "downvote a swill idea does nothing" do
    idea = Idea.create(title: "title", body: "body")

    idea.downvote

    assert_equal 'swill', idea.quality
  end

  test "downvote a plausible idea" do
    idea = Idea.create(title: "title", body: "body", quality: 1)

    idea.downvote

    assert_equal 'swill', idea.quality
  end

  test "downvote a genius idea" do
    idea = Idea.create(title: "title", body: "body", quality: 2)

    idea.downvote

    assert_equal 'plausible', idea.quality
  end

  test "idea has many tags" do
    tag_1 = Tag.create(name: 'tag_1')
    tag_2 = Tag.create(name: 'tag_2')
    idea = Idea.create(title: "title", body: "body", tags: [tag_1, tag_2])

    assert idea.tags.find_by(name: tag_1.name)
    assert idea.tags.find_by(name: tag_2.name)
  end
end
