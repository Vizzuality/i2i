FactoryBot.define do
  factory :mobile_surveys_dataset do
    sequence(:year) { |n| n }
    iso_code { Faker::Address.country_code }
    filename { Faker::File.file_name }
  end
end
