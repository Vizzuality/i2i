FactoryBot.define do
  factory :region_4_year do
    sequence(:year) { |n| n }
    total { Faker::Number.decimal(l_digits: 2) }
    data_url { Faker::Internet.url }

    association :region, factory: :region
  end
end
