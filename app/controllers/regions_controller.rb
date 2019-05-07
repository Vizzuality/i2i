class RegionsController < ApplicationController
  def show
    @region = Region.includes(:countries, :partners).friendly.find(params[:iso].to_s.downcase)
    @finscope_countries = Country.finscope_country_list.map { |country_hash| country_hash[:iso] }
    
    @countries = @region.countries.order(:name)
    
    @countries = @countries.each_with_object([]) { |country, acc|
      has_finscope = @finscope_countries.include?(country.iso)
      has_national_diaries = country.financial_diaries.present?
      has_fsp_maps = country.has_fsp_maps
      has_dataset = has_finscope || has_national_diaries || has_fsp_maps
      
      acc.push OpenStruct.new(
        has_dataset: has_dataset,
        country: country
      )
    }
    
    @partners = @region.partners.order(:name)
    @downloads = []

    @additional_downloads = [OpenStruct.new(filename: 'testing file name', year: 2015),
                             OpenStruct.new(filename: 'testing file name 2', year: 2014),
                             OpenStruct.new(filename: 'testing file name 3', year: 2013)]
    gon.more_downloads = @additional_downloads
  end
end
