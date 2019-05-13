class FinancialDiariesController < ApplicationController
  def index
    @countries_db = Country.ordered_by_name.select { |c| c.financial_diaries.present? }
    @regions = Region.joins(:country_regions).where(country_regions: { country_id: @countries_db.pluck(:id) }).uniq
    
    @countries = @countries_db.each_with_object([]) do |country, acc|
      acc.push OpenStruct.new(
        name: country.name,
        iso: country.iso,
        has_dataset: true,
        icon: :financial_diaries
      )
    end
  end
end
