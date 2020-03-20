require 'rails_helper'

RSpec.describe Country4Year, type: :model do
  subject(:country_4_year) { FactoryBot.build(:country_4_year) }

  it 'is valid with valid attributes' do
    country_4_year = FactoryBot.build(:country_4_year)
    expect(country_4_year).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:year) }

    it { is_expected.to validate_uniqueness_of(:year).scoped_to(:country_id) }
  end

  context 'Relations' do
    it { is_expected.to belong_to(:country) }
  end
end
