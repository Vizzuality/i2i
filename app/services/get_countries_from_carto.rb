class GetCountriesFromCarto
    CARTODB_USERNAME = ENV['FSP_CARTO_ACCOUNT']
    CARTODB_API_KEY = ENV['FSP_CARTO_UPLOAD_API_KEY']
    CARTODB_TABLE = ENV['FSP_CARTO_TABLE']
    
    attr_reader :dataset, :message
    
    def initialize()
    end
    
    def perform
      resp = HTTParty.post(api_url_with_key, body: { "q": delete_query })
      
      if resp["error"].present?
        @message = "Error message: #{resp['error']}."
        false
      else
        @message = "Done!"
        resp
      end
    end
    
    private
    
    def delete_query
      "SELECT DISTINCT country, iso FROM #{CARTODB_TABLE}"
    end
    
    def api_url_with_key
      "https://#{CARTODB_USERNAME}.carto.com/api/v2/sql?api_key=#{CARTODB_API_KEY}"
    end
  end
  