FactoryBot.define do
  factory :region do
    name { Faker::Address.country }
    iso { Faker::Address.country_code_long }
    slug { Faker::Address.country_code }
  end
end
