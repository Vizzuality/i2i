require 'rails_helper'

RSpec.describe Region4Year, type: :model do
  subject(:region_4_year) { FactoryBot.build(:region_4_year) }

  it 'is valid with valid attributes' do
    region_4_year = FactoryBot.build(:region_4_year)
    expect(region_4_year).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:year) }

    it { is_expected.to validate_uniqueness_of(:year).scoped_to(:region_id) }
  end

  context 'Relations' do
    it { is_expected.to belong_to(:region) }
  end
end
