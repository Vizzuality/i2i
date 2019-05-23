module Dpapi
  class PopulationController < ApiController
    def index
      population_data = Population.joins('INNER JOIN countries ON countries.iso = populations.country')
        .select('countries.name as country, country as iso, year, sum(value) as value')
        .where(region: params[:code])
        .group('countries.name', :country, :year)
        .order(:country, :year)

      render json: population_data, adapter: :json
    end
  end
end
