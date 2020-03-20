FactoryBot.define do
  factory :original_answer do
    answer { {one: 1, two: 2, three: 3}.as_json }
    iso { Faker::Address.country_code_long }
    sequence(:year) { |n| n }

    association :country_4_year, factory: :country_4_year
  end
end
