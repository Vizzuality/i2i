require 'rails_helper'

RSpec.describe AnswerRegion, type: :model do
  subject(:answer_region) { FactoryBot.build(:answer_region) }

  it 'is valid with valid attributes' do
    answer_region = FactoryBot.build(:answer_region)
    expect(answer_region).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:row_id) }
    it { is_expected.to validate_presence_of(:indicator_id) }
    it { is_expected.to validate_presence_of(:weight) }
    it { is_expected.to validate_presence_of(:iso) }
    it { is_expected.to validate_presence_of(:year) }
  end

  context 'Relations' do
    it { is_expected.to belong_to(:region_4_year).dependent(:destroy) }
  end
end
