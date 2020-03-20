require 'rails_helper'

RSpec.describe OriginalAnswer, type: :model do
  subject(:original_answer) { FactoryBot.build(:original_answer) }

  it 'is valid with valid attributes' do
    original_answer = FactoryBot.build(:original_answer)
    expect(original_answer).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:answer) }
    it { is_expected.to validate_presence_of(:iso) }
    it { is_expected.to validate_presence_of(:year) }
  end

  context 'Relations' do
    it { is_expected.to belong_to(:country_4_year).dependent(:destroy) }
  end
end
