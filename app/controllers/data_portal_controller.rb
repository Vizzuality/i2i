class DataPortalController < ApplicationController
  def index
    @countries_db = Country.ordered_by_name
    @finscope_countries = Country.finscope_country_list.map { |country_hash| country_hash[:iso] }
    
    @countries = @countries_db.each_with_object([]) do |country, acc|
      has_finscope = @finscope_countries.include?(country.iso)
      has_national_diaries = country.financial_diaries.present?
      has_fsp_maps = country.has_fsp_maps
      has_dataset = has_finscope || has_national_diaries || has_fsp_maps
      
      if has_dataset
        acc.push OpenStruct.new(
          name: country.name,
          iso: country.iso,
          has_dataset: has_dataset,
          has_finscope: @finscope_countries.include?(country.iso),
          has_national_diaries: country.financial_diaries.present?,
          has_fsp_maps: country.has_fsp_maps
        )
      end
    end
    
    @regions = Region.all
  end

  def show
    @countries = Country.all.map(&:finscope).compact
    @country = Country.find_by(iso: params[:iso])
    @country_latest_year = @countries.find do |c|
      c[:iso] == @country.iso
    end[:latest_year].to_s
  end
end
