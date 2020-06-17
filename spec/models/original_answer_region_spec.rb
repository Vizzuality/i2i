require 'rails_helper'

RSpec.describe OriginalAnswerRegion, type: :model do
  subject(:original_answer_region) { FactoryBot.build(:original_answer_region) }

  it 'is valid with valid attributes' do
    original_answer_region = FactoryBot.build(:original_answer_region)
    expect(original_answer_region).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:answer) }
    it { is_expected.to validate_presence_of(:iso) }
    it { is_expected.to validate_presence_of(:year) }
  end

  context 'Relations' do
    it { is_expected.to belong_to(:region_4_year).dependent(:destroy) }
  end
end
