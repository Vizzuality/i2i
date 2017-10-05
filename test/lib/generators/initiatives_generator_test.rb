require 'test_helper'
require 'generators/initiatives/initiatives_generator'

class InitiativesGeneratorTest < Rails::Generators::TestCase
  tests InitiativesGenerator
  destination Rails.root.join('tmp/generators')
  setup :prepare_destination

  # test "generator runs without errors" do
  #   assert_nothing_raised do
  #     run_generator ["arguments"]
  #   end
  # end
end
