require 'rails_helper'

RSpec.describe Country, type: :model do
  subject(:country) { FactoryBot.build(:country) }

  it 'is valid with valid attributes' do
    country = FactoryBot.build(:country)
    expect(country).to be_valid
  end

  context 'Validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:iso) }
    it { is_expected.to validate_presence_of(:short_iso) }
  end

  context 'Relations' do
    it { is_expected.to have_many(:country_regions).dependent(:destroy) }
    it { is_expected.to have_many(:regions).through(:country_regions) }

    it { is_expected.to have_many(:country_partners) }
    it { is_expected.to have_many(:partners).through(:country_partners) }

    it { is_expected.to have_many(:countries_blogs) }
    it { is_expected.to have_many(:blogs).through(:countries_blogs) }

    it { is_expected.to have_many(:countries_events) }
    it { is_expected.to have_many(:events).through(:countries_events) }

    it { is_expected.to have_many(:countries_libraries) }
    it { is_expected.to have_many(:libraries).through(:countries_libraries) }

    it { is_expected.to have_many(:countries_news) }
    it { is_expected.to have_many(:news).through(:countries_news) }

    it { is_expected.to have_many(:links).dependent(:destroy) }
  end

  describe 'Nested attributes' do
    it { is_expected.to accept_nested_attributes_for(:links).allow_destroy(true) }
  end

  context 'Methods' do
    describe '#has_dataset' do
      context 'when there is financial_diaries or geospatial' do
        let(:project_metadatum) do
          FactoryBot.create(:project_metadatum, country_iso3: country.iso)
        end

        it 'return true' do
          project_metadatum
          expect(country.has_dataset).to eql true
        end
      end

      context 'when there is not financial_diaries or geospatial' do
        before do
          allow_any_instance_of(Country).to receive(:financial_diaries).and_return(nil)
          allow_any_instance_of(Country).to receive(:finscope).and_return(nil)
          allow_any_instance_of(Country).to receive(:geospatial).and_return(nil)
        end

        it 'return false' do
          expect(country.has_dataset).to eql false
        end
      end
    end

    describe '#financial_diaries' do
      let(:project_metadatum) do
        FactoryBot.create(:project_metadatum, country_iso3: country.iso)
      end

      it 'return the project metadataum associated with the country ' do
        project_metadatum
        expect(country.financial_diaries).to eql project_metadatum
      end
    end

    describe '#geospatial' do
      context 'when country has fsp_maps' do
        before do
          country.update_attributes(has_fsp_maps: true)

          stub_request(
            :post,
            "https://#{GetCountriesFromCarto::CARTODB_USERNAME}.carto.com/api/v2/sql?api_key=#{GetCountriesFromCarto::CARTODB_API_KEY}"
          ).to_return(
            status: 200,
            body: "{\"rows\":[]}"
          )
        end

        it 'return true' do
          expect(country.geospatial).to eql true
        end
      end

      context 'when the country is included on the list from carto' do
        before do
          stub_request(
            :post,
            "https://#{GetCountriesFromCarto::CARTODB_USERNAME}.carto.com/api/v2/sql?api_key=#{GetCountriesFromCarto::CARTODB_API_KEY}"
          ).to_return(
            status: 200,
            body: "{\"rows\":[{\"iso\":\"#{country.iso}\"}]}"
          )
        end

        it 'return true' do
          expect(country.geospatial).to eql true
        end
      end

      context 'when the country  has not fsp_maps and it is not included on the list from carto' do
        before do
          stub_request(
            :post,
            "https://#{GetCountriesFromCarto::CARTODB_USERNAME}.carto.com/api/v2/sql?api_key=#{GetCountriesFromCarto::CARTODB_API_KEY}"
          ).to_return(
            status: 200,
            body: "{\"rows\":[]}"
          )
        end

        it 'return false' do
          expect(country.geospatial).to eql false
        end
      end
    end

    describe '#bbox_raw' do
      it 'return an array' do
        country.update_attributes(bbox: ['one', 'two', 'three'])
        expect(country.bbox_raw).to eql('one,two,three')
      end
    end

    describe '#bbox_raw=' do
      it 'set bbox as an array' do
        country.bbox_raw = 'one,two,three'
        expect(country.bbox).to eql ['one', 'two', 'three']
      end
    end
  end
end
