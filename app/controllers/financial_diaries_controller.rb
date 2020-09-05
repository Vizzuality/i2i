class FinancialDiariesController < ApplicationController
  def index
    @countries_db = Country.ordered_by_name.select { |c| c.financial_diaries.present? }
    @regions = []
    # @regions = Region.joins(:country_regions).where(country_regions: { country_id: @countries_db.pluck(:id) }).uniq

    @worldwide_countries = @countries_db.each_with_object([]) do |country, acc|
      acc.push OpenStruct.new(
        name: country.name,
        iso: country.iso,
        flag_url: country.flag&.dig(:original)&.url,
        link: data_portal_financial_diaries_path(country.iso),
        has_dataset: true,
        icon: :financial_diaries
      )
    end

    @regional_countries = CountryRegion.joins(:country).includes(:country).each_with_object({}) do |country_region, acc|
      country = country_region.country

      if country.financial_diaries.present?
        if acc.has_key?(country_region.region_id)
          acc[country_region.region_id].push OpenStruct.new(
            name: country.name,
            iso: country.iso,
            flag_url: country.flag&.dig(:original)&.url,
            link: data_portal_financial_diaries_path(country.iso),
            has_dataset: true,
            icon: :financial_diaries
          )
        else
          acc[country_region.region_id] = [OpenStruct.new(
            name: country.name,
            iso: country.iso,
            flag_url: country.flag&.dig(:original)&.url,
            link: data_portal_financial_diaries_path(country.iso),
            has_dataset: true,
            icon: :financial_diaries
          )]
        end
      end
    end

    @regions_hash = []
    # @regions_hash = @regional_countries.each { |k, v| @regional_countries[k] = v.sort_by { |country| country.name } }
  end
end
