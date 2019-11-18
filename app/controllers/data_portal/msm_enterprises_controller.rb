class DataPortal::MsmEnterprisesController < ApplicationController

  def index
    @finscope_countries = Country.finscope_country_list
    @countries_db = Country.ordered_by_name.select { |c| @finscope_countries.map { |country_hash| country_hash[:iso] }.include?(c.iso) }

    @worldwide_countries = @countries_db.each_with_object([]) do |country, acc|
      acc.push OpenStruct.new(
        name: country.name,
        iso: country.iso,
        link: msm_enterprises_show_path(country.iso, @finscope_countries.find { |finscope_hash| finscope_hash[:iso] == country.iso }[:latest_year]),
        has_dataset: true,
        icon: :national_surveys
      )
    end

    @regional_countries = CountryRegion.joins(:country).includes(:country).each_with_object({}) do |country_region, acc|
      country = country_region.country
      if @finscope_countries.map { |country_hash| country_hash[:iso] }.include?(country.iso)
        if acc.has_key?(country_region.region_id)
          acc[country_region.region_id].push OpenStruct.new(
            name: country.name,
            iso: country.iso,
            link: msm_enterprises_show_path(country.iso, @finscope_countries.find { |finscope_hash| finscope_hash[:iso] == country.iso }[:latest_year]),
            has_dataset: true,
            icon: :national_surveys
          )
        else
          acc[country_region.region_id] = [OpenStruct.new(
            name: country.name,
            iso: country.iso,
            link: msm_enterprises_show_path(country.iso, @finscope_countries.find { |finscope_hash| finscope_hash[:iso] == country.iso }[:latest_year]),
            has_dataset: true,
            icon: :national_surveys
          )]
        end
      end
    end

    @regions_hash = @regional_countries.each { |k, v| @regional_countries[k] = v.sort_by { |country| country.name } }
    @regions = Region.joins(:country_regions).where(country_regions: { country_id: @countries_db.pluck(:id) }).uniq
  end

  def show
    @countries = Country.all.map(&:finscope).compact
    @country = Country.find_by(iso: params[:iso])
    @country_latest_year = @countries.find do |c|
      c[:iso] == @country.iso
    end[:latest_year].to_s
    render :layout => 'data_portal'
  end
end
