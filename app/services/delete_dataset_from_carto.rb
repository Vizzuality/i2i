class DeleteDatasetFromCarto
  CARTODB_USERNAME = ENV['FSP_CARTO_ACCOUNT']
  CARTODB_API_KEY = ENV['FSP_CARTO_API_KEY']
  CARTODB_TABLE = ENV['FSP_CARTO_TABLE']
  
  attr_reader :dataset, :message
  
  def initialize(dataset_id)
    @dataset = Dataset.find(dataset_id)
  end
  
  def perform
    resp = HTTParty.post(api_url_with_key, body: { "q": delete_query })
    
    if resp["error"].present?
      @message = "Dataset was not deleted. Error message: #{resp['error']}."
      false
    else
      @message = "Dataset was deleted! Deleted records: #{resp['total_rows'] || 0}."
    end
  end
  
  private
  
  def delete_query
    "DELETE FROM #{CARTODB_TABLE} WHERE #{CARTODB_TABLE}.dataset_id = #{dataset.id}"
  end
  
  def api_url_with_key
    "https://#{CARTODB_USERNAME}.carto.com/api/v2/sql?api_key=#{CARTODB_API_KEY}"
  end
end
