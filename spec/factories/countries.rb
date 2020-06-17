FactoryBot.define do
  factory :country do
    name { Faker::Address.country }
    iso { Faker::Address.country_code_long }
    short_iso { Faker::Address.country_code }
  end
end
