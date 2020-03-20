FactoryBot.define do
  factory :country_4_year do
    sequence(:year) { |n| n }
    total_msme { Faker::Number.decimal(l_digits: 2) }
    total { Faker::Number.decimal(l_digits: 2) }
    data_url { Faker::Internet.url }

    association :country, factory: :country
  end
end
