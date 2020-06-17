FactoryBot.define do
  factory :answer_region do
    sequence(:row_id) { |n| "RowId#{n}" }
    sequence(:indicator_id) { |n| "IndicatorId#{n}" }
    sequence(:child_indicator_id) { |n| "ChildIndicatorId#{n}" }
    sequence(:answer_id) { |n| "AnswerId#{n}" }
    sequence(:value) { |n| "Value#{n}" }
    sequence(:weight) { |n| n }
    iso { Faker::Address.country_code_long }
    sequence(:year) { |n| n }

    association :region_4_year, factory: :region_4_year
  end
end
