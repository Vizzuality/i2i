module Dpapi
  class GdpController < ApiController
    def by_region
      gdp_data = GrossDomesticProductByRegion.joins('INNER JOIN countries ON countries.iso = gross_domestic_product_by_regions.country')
        .select('countries.name as country, country as iso, year, value')
        .where(region: params[:code])
        .order(:year)

      render json: gdp_data, adapter: :json, root: 'data'
    end

    def by_country
      gdp_data = GrossDomesticProductBySector.joins('INNER JOIN countries ON countries.iso = gross_domestic_product_by_sectors.country')
        .select('countries.name as country_name, country as iso, sector, year')
        .where(country: params[:iso])
        .where.not(sector: 'GDP')
        .order(:year)

      render json: gdp_data, adapter: :json, root: 'data'
    end

    def by_country_over_time
      gdp_data = GrossDomesticProductByRegion.joins('INNER JOIN countries ON countries.iso = gross_domestic_product_by_regions.country')
        .select('countries.name as country, country as iso, year, value')
        .where(country: params[:iso])
        .order(:year)

      render json: gdp_data, adapter: :json, root: 'data'
    end
  end
end
