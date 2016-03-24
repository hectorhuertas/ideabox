require 'test_helper'

class HomeTest < ActionDispatch::IntegrationTest
  test "starting setup" do
    get root_path

    assert response.body.include? 'Ideabox'
    assert response.body.include? 'id="show-all"'
    assert response.body.include? 'id="sort-by-quality"'
    assert response.body.include? 'id="fuzzy-filter"'
    assert response.body.include? 'id="tag-list"'
    assert response.body.include? 'id="idea-box"'
    assert response.body.include? 'id="save-idea"'
  end
end
