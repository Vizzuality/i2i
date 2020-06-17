require 'rails_helper'

RSpec.describe Region, type: :model do
  subject(:region) { FactoryBot.build(:region) }

  it 'is valid with valid attributes' do
    region = FactoryBot.build(:region)
    expect(region).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:iso) }
  end

  context 'Relations' do
    it { is_expected.to have_many(:country_regions).dependent(:destroy) }
    it { is_expected.to have_many(:countries).through(:country_regions) }

    it { is_expected.to have_many(:region_partners) }
    it { is_expected.to have_many(:partners).through(:region_partners) }

    it { is_expected.to have_many(:blogs_regions).dependent(:destroy) }
    it { is_expected.to have_many(:blogs).through(:blogs_regions) }

    it { is_expected.to have_many(:events_regions).dependent(:destroy) }
    it { is_expected.to have_many(:events).through(:events_regions) }

    it { is_expected.to have_many(:libraries_regions).dependent(:destroy) }
    it { is_expected.to have_many(:libraries).through(:libraries_regions) }

    it { is_expected.to have_many(:news_regions).dependent(:destroy) }
    it { is_expected.to have_many(:news).through(:news_regions) }

    it { is_expected.to have_many(:links).dependent(:destroy) }
  end

  describe 'Nested attributes' do
    it { is_expected.to accept_nested_attributes_for(:links) }
  end

  describe 'Instance methods' do
    describe '#iso_id_candidates' do
      it 'return iso_id candidates' do
        expect(region.iso_id_candidates).to eql [:iso, [:iso, :name]]
      end
    end
  end
end
