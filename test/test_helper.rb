require 'simplecov'
SimpleCov.start 'rails'

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def json
    JSON.parse(response.body)
  end

  def create_ideas(n)
    ideas = []
    n.times do |n|
      ideas << Idea.create(title: "Title_#{n}", body: "Body_#{n}") 
    end
    ideas
  end
end
