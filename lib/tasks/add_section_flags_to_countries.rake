namespace :countries do
  desc 'Set all published to true'
  task add_section_flags: :environment do
    user_countries = GetCountriesFromCarto.new.perform
    user_countries_iso =
      user_countries ? JSON.parse(user_countries.body)['rows'].collect { |c| c['iso'] } : []

    msme_countries_response = GetMsmeCountriesFromApi.new.perform
    msme_countries =
      msme_countries_response ? JSON.parse(msme_countries_response.body).collect { |c| c['iso'] } : []

    @countries_db = Country.ordered_by_name
    @finscope_countries = Country.finscope_country_list.map { |country_hash| country_hash[:iso] }

    @countries_db.each_with_object([]) do |country, acc|
      has_finscope = @finscope_countries.include?(country.iso)
      has_national_diaries = country.financial_diaries.present?
      has_fsp_maps = country.has_fsp_maps || user_countries_iso.include?(country.iso)
      has_msme = msme_countries.include?(country.iso)

      country.update_attributes(
        has_finscope: has_finscope,
        has_msme: has_msme,
        has_national_diaries: has_national_diaries,
        has_fsp_maps: has_fsp_maps
      )
    end
  end
end
