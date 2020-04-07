require 'rails_helper'

RSpec.describe MobileSurveyDataset, type: :model do
  it 'is valid with valid attributes' do
    mobile_surveys_dataset = FactoryBot.build(:mobile_surveys_dataset)
    expect(mobile_surveys_dataset).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:year) }
    it { is_expected.to validate_presence_of(:iso_code) }
    it { is_expected.to validate_presence_of(:filename) }
  end
end
