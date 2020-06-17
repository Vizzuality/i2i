FactoryBot.define do
  factory :project_metadatum do
    sequence(:name) { |n| "#{n} Country #{Faker::Address.country}" }
    country_iso2 { Faker::Address.country_code }
    country_iso3 { Faker::Address.country_code_long }
    currency_singular { Faker::Currency.name }
    currency_plural { Faker::Currency.name }
    currency_code { Faker::Currency.code }
    currency_symbol { Faker::Currency.symbol }
    start_date { Faker::Date.backward(days: 2) }
    end_date { Faker::Date.forward(days: 2) }
    province { Faker::Address.city }
    custom_text { Faker::Lorem.sentence }
  end
end
