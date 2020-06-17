require 'rails_helper'

RSpec.describe Answer, type: :model do
  subject(:answer) { FactoryBot.build(:answer) }

  it 'is valid with valid attributes' do
    answer = FactoryBot.build(:answer)
    expect(answer).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:row_id) }
    it { is_expected.to validate_presence_of(:indicator_id) }
    it { is_expected.to validate_presence_of(:weight) }
    it { is_expected.to validate_presence_of(:iso) }
    it { is_expected.to validate_presence_of(:year) }
  end

  context 'Relations' do
    it { is_expected.to belong_to(:country_4_year).dependent(:destroy) }
  end
end
